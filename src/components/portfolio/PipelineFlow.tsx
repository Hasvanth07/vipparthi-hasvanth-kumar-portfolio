import { Database, BarChart3, Workflow, Layers, DownloadCloud, HardDrive } from "lucide-react";
import { pipelineStages } from "@/lib/portfolio-data";

const icons = [HardDrive, DownloadCloud, Workflow, Database, Layers, BarChart3];

export function PipelineFlow() {
  return (
    <div className="panel mt-14 p-6 sm:p-8">
      <p className="eyebrow">Data flow</p>
      <h2 className="mt-2 text-xl font-semibold sm:text-2xl">How I think about a data platform</h2>

      <ol className="mt-8 grid gap-4 lg:grid-cols-6">
        {pipelineStages.map((stage, index) => {
          const Icon = icons[index] ?? Workflow;
          return (
            <li key={stage} className="relative">
              <div className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-4">
                <span className="flex size-9 items-center justify-center rounded-md border border-border-strong bg-surface-2">
                  <Icon className="size-4 text-primary-glow" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  0{index + 1}
                </span>
                <span className="text-sm font-medium leading-snug">{stage}</span>
              </div>
              {index < pipelineStages.length - 1 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="flow-line absolute left-1/2 top-full h-5 w-px -translate-x-1/2 lg:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-2.5 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-border-strong lg:block"
                  />
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
