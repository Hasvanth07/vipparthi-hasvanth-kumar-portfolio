import { useMemo, useState } from "react";
import { format, isAfter, startOfDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Download,
  Eye,
  FileText,
  Github,
  Inbox,
  Linkedin,
  LogOut,
  MousePointerClick,
  Users,
} from "lucide-react";
import type { ContactRow, EventRow } from "@/lib/admin-data";
import { projects } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";

type Range = 1 | 7 | 30;

const deviceColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Users }) {
  return (
    <article className="panel p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="size-4 text-primary-glow" aria-hidden="true" />
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value.toLocaleString()}</p>
    </article>
  );
}

function EmptyChart() {
  return <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">No data yet</div>;
}

export function AdminDashboard({
  events,
  contacts,
  onSignOut,
}: {
  events: EventRow[];
  contacts: ContactRow[];
  onSignOut: () => void;
}) {
  const [range, setRange] = useState<Range>(30);
  const filtered = useMemo(() => {
    const cutoff = startOfDay(subDays(new Date(), range - 1));
    return events.filter((event) => isAfter(new Date(event.created_at), cutoff));
  }, [events, range]);

  const uniqueVisitors = new Set(events.map((e) => e.session_id).filter(Boolean)).size;
  const count = (eventName: string) => events.filter((e) => e.event_name === eventName).length;
  const stats = [
    ["Total Visitors", count("page_view"), Users],
    ["Unique Visitors", uniqueVisitors, Eye],
    ["Resume Downloads", count("resume_download"), Download],
    ["Project Views", count("project_view"), FileText],
    ["GitHub Clicks", count("github_click"), Github],
    ["LinkedIn Clicks", count("linkedin_click"), Linkedin],
    ["Contact Submissions", contacts.length, Inbox],
  ] as const;

  const timeline = useMemo(() => {
    const days = Array.from({ length: range }, (_, i) => startOfDay(subDays(new Date(), range - 1 - i)));
    return days.map((day) => {
      const key = format(day, "yyyy-MM-dd");
      return {
        date: format(day, range === 1 ? "HH:mm" : "MMM d"),
        visitors: filtered.filter((e) => e.event_name === "page_view" && e.created_at.startsWith(key)).length,
        downloads: filtered.filter((e) => e.event_name === "resume_download" && e.created_at.startsWith(key)).length,
      };
    });
  }, [filtered, range]);

  const projectData = projects.map((project) => ({
    name: project.title.length > 24 ? `${project.title.slice(0, 24)}…` : project.title,
    views: events.filter((e) => e.event_name === "project_view" && e.project_slug === project.slug).length,
  }));

  const sources = Array.from(
    events.reduce((acc, event) => {
      const source = event.referrer || "Direct";
      acc.set(source, (acc.get(source) ?? 0) + 1);
      return acc;
    }, new Map<string, number>()),
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const devices = ["desktop", "mobile", "tablet"].map((name) => ({
    name: name[0]?.toUpperCase() + name.slice(1),
    value: events.filter((e) => e.device_type === name).length,
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-mono text-sm tracking-[0.18em]">VHK<span className="text-primary-glow">.</span></p>
            <p className="mt-1 text-xs text-muted-foreground">Portfolio analytics</p>
          </div>
          <Button type="button" variant="technical" onClick={onSignOut}>
            <LogOut className="size-4" aria-hidden="true" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Private dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold">Portfolio performance</h1>
            <p className="mt-2 text-sm text-muted-foreground">Actual events only. Empty metrics remain at zero.</p>
          </div>
          <div className="flex rounded-lg border border-border bg-surface p-1">
            {([1, 7, 30] as Range[]).map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setRange(days)}
                className={`rounded-md px-3 py-2 text-xs transition-colors ${
                  range === days ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {days === 1 ? "Today" : `${days} Days`}
              </button>
            ))}
          </div>
        </div>

        <section aria-label="Summary metrics" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value, icon]) => <StatCard key={label} label={label} value={value} icon={icon} />)}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="panel p-5 sm:p-6">
            <h2 className="text-base font-semibold">Visitors & Resume Downloads</h2>
            {filtered.length === 0 ? <EmptyChart /> : (
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeline}>
                    <defs>
                      <linearGradient id="visitors" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="date" stroke="var(--muted-foreground)" tickLine={false} fontSize={11} />
                    <YAxis allowDecimals={false} stroke="var(--muted-foreground)" tickLine={false} fontSize={11} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Area type="monotone" dataKey="visitors" stroke="var(--chart-1)" fill="url(#visitors)" />
                    <Area type="monotone" dataKey="downloads" stroke="var(--chart-2)" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </article>

          <article className="panel p-5 sm:p-6">
            <h2 className="text-base font-semibold">Project Engagement</h2>
            {projectData.every((item) => item.views === 0) ? <EmptyChart /> : (
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectData} layout="vertical" margin={{ left: 8 }}>
                    <CartesianGrid stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} stroke="var(--muted-foreground)" fontSize={11} />
                    <YAxis dataKey="name" type="category" width={130} stroke="var(--muted-foreground)" fontSize={10} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Bar dataKey="views" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </article>

          <article className="panel p-5 sm:p-6">
            <h2 className="text-base font-semibold">Traffic Sources</h2>
            {sources.length === 0 ? <EmptyChart /> : (
              <ul className="mt-5 space-y-3">
                {sources.map((source) => (
                  <li key={source.name} className="flex items-center justify-between gap-4 border-b border-border pb-3 text-sm">
                    <span className="truncate text-muted-foreground">{source.name}</span>
                    <span className="font-mono">{source.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="panel p-5 sm:p-6">
            <h2 className="text-base font-semibold">Device Breakdown</h2>
            {devices.every((item) => item.value === 0) ? <EmptyChart /> : (
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={devices} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                      {devices.map((entry, index) => <Cell key={entry.name} fill={deviceColors[index] ?? "var(--chart-1)"} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="panel overflow-hidden">
            <div className="border-b border-border p-5 sm:p-6"><h2 className="text-base font-semibold">Recent Activity</h2></div>
            {events.length === 0 ? <EmptyChart /> : (
              <ul className="divide-y divide-border">
                {events.slice(0, 12).map((event) => (
                  <li key={event.id} className="flex items-start gap-3 p-4 text-sm">
                    <MousePointerClick className="mt-0.5 size-4 shrink-0 text-primary-glow" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p>{event.event_name.replaceAll("_", " ")}{event.project_slug ? ` · ${event.project_slug.replaceAll("-", " ")}` : ""}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">{format(new Date(event.created_at), "MMM d, yyyy · h:mm a")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="panel overflow-hidden">
            <div className="border-b border-border p-5 sm:p-6"><h2 className="text-base font-semibold">Contact Submissions</h2></div>
            {contacts.length === 0 ? <EmptyChart /> : (
              <ul className="divide-y divide-border">
                {contacts.slice(0, 8).map((contact) => (
                  <li key={contact.id} className="p-4 text-sm">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-medium">{contact.name}</p>
                      <time className="font-mono text-xs text-muted-foreground">{format(new Date(contact.created_at), "MMM d")}</time>
                    </div>
                    <a href={`mailto:${contact.email}`} className="mt-1 block text-xs text-primary-glow">{contact.email}</a>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{contact.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}