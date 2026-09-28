import profileImage from "@/assets/profile.jpeg.asset.json";
import resumeAsset from "@/assets/Vipparthi_Hasvanth_Kumar_Data_Engineer.pdf.asset.json";
import linkedin1 from "@/assets/linkedin-1.png.asset.json";
import linkedin2 from "@/assets/linkedin-2.png.asset.json";
import salesDashboard from "@/assets/sales-dashboard.png.asset.json";
import stockMarket from "@/assets/stock-market.jpg.asset.json";
import stockPrediction from "@/assets/stock-prediction.jpg.asset.json";
import genthreat from "@/assets/genthreat.jpg.asset.json";
import biometric from "@/assets/biometric.jpg.asset.json";
import cryptoPcaOutput from "@/assets/crypto-pca-output.jpg.asset.json";
import cryptoDashboard from "@/assets/crypto-dashboard.jpg.asset.json";
import codecInternshipCertificate from "@/assets/codec-internship-certificate.jpg.asset.json";
import syntecxhubInternshipOffer from "@/assets/syntecxhub-internship-offer.jpg.asset.json";
import syntecxhubInternshipCertificate from "@/assets/syntecxhub-internship-certificate.jpg.asset.json";
import googleGenerativeAiCertificate from "@/assets/google-generative-ai-certificate.jpg.asset.json";
import deloitteDataAnalyticsCertificate from "@/assets/deloitte-data-analytics-certificate.jpg.asset.json";
import tataGenaiCertificate from "@/assets/tata-genai-certificate.jpg.asset.json";
import deloitteTechnologyCertificate from "@/assets/deloitte-technology-certificate.jpg.asset.json";
import niltechJavaInternshipCertificate from "@/assets/niltech-edu-java-internship-certificate.jpeg.asset.json";
import internshalaPythonTrainingCertificate from "@/assets/internshala-python-training-certificate.jpg.asset.json";
import internshalaSkillIndiaCertificate from "@/assets/internshala-skill-india-certificate.jpg.asset.json";

export const profile = {
  name: "VIPPARTHI HASVANTH KUMAR",
  title: "ASPIRING DATA ENGINEER",
  tagline: "Python • SQL • ETL/ELT • PostgreSQL • Data Pipelines • Cloud",
  location: "Hyderabad, Telangana",
  phone: "+91 70324 46354",
  email: "chintuhaswanth1421@gmail.com",
  linkedin: "https://www.linkedin.com/in/vipparthi-hasvanth-kumar",
  linkedinLabel: "linkedin.com/in/vipparthi-hasvanth-kumar",
  github: "https://github.com/Hasvanth07",
  githubLabel: "github.com/Hasvanth07",
  photoUrl: profileImage.url,
  resumeUrl: resumeAsset.url,
  intro:
    "AI & Data Science graduate with hands-on experience in Python, SQL, data processing, data transformation, API-based applications, and analytics through internships and projects. Currently focused on building reliable data workflows, databases, ETL/ELT pipelines, and cloud-oriented data systems.",
  summary:
    "AI & Data Science graduate with hands-on experience in Python, SQL, data processing, data transformation, API-based applications, and analytics through internships and projects. Experienced with structured and relational data, cleaning, transformation, and visualization. Familiar with ETL/ELT concepts, data pipelines, PostgreSQL, Apache Airflow, PySpark, Docker, and cloud technologies. Seeking an entry-level Data Engineer opportunity to build reliable data workflows, databases, and data-driven systems.",
};

export const pipelineStages = [
  "Source Data",
  "Data Ingestion",
  "ETL / ELT",
  "PostgreSQL / Data Warehouse",
  "Data Pipelines",
  "Analytics",
];

export const skillGroups = [
  { title: "Programming", items: ["Python", "SQL", "Java", "HTML", "CSS"] },
  {
    title: "Data Engineering",
    items: [
      "ETL/ELT",
      "Data Pipelines",
      "Data Transformation",
      "Data Cleaning",
      "Data Processing",
      "Data Warehousing Concepts",
    ],
  },
  { title: "Databases", items: ["PostgreSQL", "SQL", "Relational Databases"] },
  {
    title: "Data Processing & Visualization",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    title: "Data Engineering Technologies",
    items: ["Apache Airflow", "PySpark", "Docker"],
  },
  { title: "Cloud & Tools", items: ["AWS", "Git", "GitHub"] },
  { title: "Analytics & BI", items: ["Power BI", "Power Query", "DAX", "Tableau", "Excel"] },
  { title: "Machine Learning", items: ["Scikit-learn", "Machine Learning"] },
];

export const experience = [
  {
    company: "SYNTECXHUB",
    role: "Data Analysis Intern",
    mode: "Remote",
    period: "July 2026 – August 2026",
    points: [
      "Analyzed business datasets using SQL and Python to clean, transform, and join relational data.",
      "Processed structured datasets for analysis and reporting.",
      "Built Power BI dashboards using Power Query, relationships, and DAX.",
      "Used SQL and Excel to analyze business performance metrics.",
    ],
    documents: [
      { label: "Internship offer", image: syntecxhubInternshipOffer.url },
      { label: "Internship certificate", image: syntecxhubInternshipCertificate.url },
    ],
  },
  {
    company: "CODEC TECHNOLOGIES",
    role: "Data Analytics Intern",
    mode: "Hybrid",
    period: "June 2026 – July 2026",
    points: [
      "Processed business datasets using Python, SQL, and Excel for data preparation.",
      "Performed SQL extraction using JOINs, GROUP BY, filtering, and aggregate functions.",
      "Prepared structured datasets for comparative analysis.",
      "Created analytical reports and visualizations for operational metrics.",
    ],
    documents: [{ label: "Internship certificate", image: codecInternshipCertificate.url }],
  },
  {
    company: "NILTECH-EDU",
    role: "Java Intern",
    mode: "Hyderabad",
    period: "November 2024 – December 2024",
    points: [
      "Developed Java applications using object-oriented programming concepts.",
      "Applied structured programming and fundamental software logic.",
      "Debugged existing Java code and investigated execution issues.",
      "Resolved technical issues through systematic troubleshooting.",
    ],
    documents: [
      { label: "Java internship certificate", image: niltechJavaInternshipCertificate.url },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  status?: "UPCOMING";
  featured?: boolean;
  description: string;
  technologies: string[];
  details: string[];
  images: string[];
  github?: string;
  liveDemo?: string;
};

export const projects: Project[] = [
  {
    slug: "linkedin-message-personalizer",
    title: "LinkedIn Message Personalizer",
    featured: true,
    description:
      "Full-stack web application for managing contacts and personalized LinkedIn outreach.",
    technologies: ["Next.js", "React", "Supabase", "PostgreSQL", "GitHub", "Vercel"],
    details: [
      "Developed a full-stack web application for managing contacts and personalized LinkedIn outreach.",
      "Implemented user authentication and database-backed contact management using Supabase.",
      "Designed workflows for storing, updating, and managing contact information.",
      "Deployed the application on Vercel and maintained source code through GitHub.",
    ],
    images: [linkedin1.url, linkedin2.url],
  },
  {
    slug: "sales-performance-dashboard",
    title: "Sales Performance Dashboard",
    description:
      "Interactive Power BI dashboard built on cleaned and transformed sales datasets.",
    technologies: ["Python", "Pandas", "NumPy", "Power BI", "Excel", "Power Query", "DAX"],
    details: [
      "Cleaned and transformed sales datasets using Pandas, NumPy, Excel, and Power Query.",
      "Created data relationships and DAX measures for revenue, profit, growth, and performance metrics.",
      "Designed interactive dashboards with KPI cards, slicers, and multi-dimensional visualizations.",
      "Presented sales trends and performance patterns through interactive reports.",
    ],
    images: [salesDashboard.url],
  },
  {
    slug: "stock-market-tracker",
    title: "Stock Market Tracker",
    description:
      "Flask application that retrieves and processes market data through the Yahoo Finance API.",
    technologies: ["Python", "Flask", "Pandas", "Yahoo Finance API"],
    details: [
      "Developed a Flask-based web application to retrieve stock-market data using the Yahoo Finance API.",
      "Retrieved and processed market data programmatically for downstream analysis.",
      "Used Pandas to organize and transform retrieved data for analysis and visualization.",
      "Created visualizations to track stock-price movements and market trends over time.",
    ],
    images: [stockMarket.url, stockPrediction.url],
  },
  {
    slug: "genthreat-ai",
    title: "GenThreat AI for Advanced Cyber Threat Intelligence",
    description:
      "Machine-learning system that analyzes and classifies cybersecurity threat data.",
    technologies: ["Python", "Scikit-learn", "Machine Learning"],
    details: [
      "Developed a machine-learning system to analyze and classify cybersecurity threat data.",
      "Performed data preprocessing and cleaning to prepare threat datasets for modeling.",
      "Applied feature extraction techniques to transform threat data into model-ready features.",
      "Implemented classification models using Python and Scikit-learn to identify threat patterns.",
    ],
    images: [genthreat.url],
  },
  {
    slug: "secure-crypto-biometric-authentication",
    title: "Secure Crypto-Biometric Authentication",
    description:
      "Biometric authentication framework built with Python and Hidden Markov Models.",
    technologies: ["Python", "Hidden Markov Model", "Machine Learning"],
    details: [
      "Developed a biometric authentication framework using Python and Hidden Markov Models.",
      "Applied HMM techniques to model biometric authentication patterns.",
      "Worked with machine-learning concepts for authentication pattern analysis.",
      "Structured the project around secure biometric authentication and pattern modeling.",
    ],
    images: [biometric.url, cryptoDashboard.url, cryptoPcaOutput.url],
  },
  {
    slug: "cloud-native-ecommerce-data-warehouse",
    title: "Cloud-Native E-commerce Data Warehouse & Automated ELT Platform",
    status: "UPCOMING",
    description:
      "A planned end-to-end data engineering platform focused on automated ELT workflows, data ingestion, transformation, orchestration, and cloud-oriented data warehousing for analytical workloads.",
    technologies: ["Data Engineering", "ETL/ELT", "Data Warehouse", "Cloud"],
    details: [
      "Planned an end-to-end data engineering platform for e-commerce data workflows.",
      "Will focus on automated ELT processes for ingesting and transforming source data.",
      "Will implement a cloud-oriented data warehouse architecture for analytical workloads.",
      "Project will demonstrate data pipelines, transformation, orchestration, and warehouse concepts.",
    ],
    images: [],
  },
];

export const education = [
  {
    school: "St. Martin's Engineering College",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    year: "2026",
    extra: "CGPA: 7.19/10",
  },
  {
    school: "Mahaveer Institute of Science & Technology",
    degree: "Diploma — Mechanical Engineering",
    year: "2022",
  },
  {
    school: "Crescent High School",
    degree: "Secondary School Certificate (SSC)",
    year: "2019",
  },
];

export const certifications = [
  { name: "Data Analytics Essentials", issuer: "Cisco", date: "July 2026" },
  { name: "Data Fundamentals", issuer: "IBM" },
  {
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
    image: deloitteDataAnalyticsCertificate.url,
  },
  {
    name: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata",
    image: tataGenaiCertificate.url,
  },
  {
    name: "Programming in Python with AI",
    issuer: "Internshala",
    date: "September 2026",
    images: [internshalaPythonTrainingCertificate.url, internshalaSkillIndiaCertificate.url],
  },
  {
    name: "Introduction to Generative AI Studio",
    issuer: "Google Cloud",
    image: googleGenerativeAiCertificate.url,
  },
  {
    name: "Technology Job Simulation",
    issuer: "Deloitte Australia",
    image: deloitteTechnologyCertificate.url,
  },
];

export const achievements = [
  "College Chess Champion",
  "3rd Place – College Badminton Tournament",
  "3rd Place – College Kabaddi Tournament",
];

export const aboutFocusAreas = [
  "ETL/ELT",
  "Data Pipelines",
  "PostgreSQL",
  "Data Warehousing",
  "Apache Airflow",
  "PySpark",
  "Docker",
  "Cloud Technologies",
];
