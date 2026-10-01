export type LinkKind = "repo" | "site" | "article" | "package";

export interface Link {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface TechBadge {
  name: string;
}

export interface SubRole {
  role: string;
  dates: string;
}

export interface Subsection {
  title: string;
  badges?: TechBadge[];
  content?: string;
  role?: string;
  dates?: string;
  subRoles?: SubRole[];
  description?: string;
  stack?: string[];
  stackLabel?: string;
  links?: Link[];
  linksLabel?: string;
  bullets?: string[];
}

export interface Section {
  heading: string;
  intro?: string;
  subsections: Subsection[];
}

export interface ArticleEntry {
  type: "article" | "video";
  title: string;
  href: string;
  source: string;
  summary: string;
}

const sections: Section[] = [
  {
    heading: "Profile",
    subsections: [
      {
        title: "Profile",
        content:
          "I'm a software developer with a background in mathematics and physics. My journey in computer science started during my time at UCT, and, well, the rest is history :)",
      },
    ],
  },

  {
    heading: "Key Skills",
    subsections: [
      {
        title: "Languages & Technologies",
        badges: [
          { name: "C#" },
          { name: "Python" },
          { name: "JavaScript" },
          { name: "TypeScript" },
          { name: "SQL" },
          { name: "Rust" },
        ],
      },
      {
        title: "Operating Systems",
        content: "Preference: Linux, Mac, Windows (in order of preference)",
      },
      {
        title: "Tools",
        badges: [
          { name: "NeoVim" },
          { name: "Git" },
          { name: "Docker" },
          { name: "Kubernetes" },
          { name: "Claude" },
          { name: "Bash" },
          { name: "Powershell" },
        ],
      },
      {
        title: "CloudOps",
        badges: [
          { name: "Azure" },
          { name: "Helm" },
          { name: "AKS" },
          { name: "Confluent Cloud" },
          { name: "Cosmos" },
          { name: "Terraform" },
          { name: "ArgoCD" },
          { name: "Azure DevOps" },
          { name: "GitHub Workflows" },
        ],
      },
      {
        title: "Frameworks",
        badges: [
          { name: ".NET" },
          { name: "Angular" },
          { name: "IONIC" },
          { name: "Node.js" },
          { name: "Vue" },
          { name: "Dapr" },
          { name: "Kafka" },
          { name: "RabbitMQ" },
          { name: "NATS" },
          { name: "d3.js" },
          { name: "LangChain" },
          { name: "LangGraph" },
          { name: "SemanticKernel" },
          { name: "Expo" },
          { name: "React Native" },
          { name: "Supabase" },
          { name: "Effect-TS" },
        ],
      },
      {
        title: "Databases",
        badges: [
          { name: "PostgreSQL" },
          { name: "MySQL" },
          { name: "MSSQL" },
          { name: "Couchbase" },
          { name: "Cosmos" },
          { name: "MongoDB" },
          { name: "SQLite" },
        ],
      },
    ],
  },

  {
    heading: "Key Achievements",
    subsections: [
      {
        title: 'Project "Mandy" - Metrics Dashboard',
        role: "Architect & Lead Developer",
        description:
          'Created a productivity tool used at Derivco for tracking the health of projects. Designed as a way to move away from a "meeting culture" by providing real-time project insights.',
        bullets: [
          "Architecture: Microservices with the following stack:",
          "Frontend: d3.js, Vue.js",
          "Backend Services: Python Fast APIs for workflow orchestration and data management, Node.js Express API for authentication (Okta integration), .NET API for Azure DevOps proxy",
          "Infrastructure: Dapr runtime, Cosmos DB state store",
        ],
      },
      {
        title: "APC (Auto Promo Creation)",
        role: "Architect & Lead Developer",
        description:
          "Leveraging generative AI to build full, production-worthy solutions for automated promotion creation.",
      },
      {
        title: "Campaign Manager",
        role: "Lead Developer",
        description:
          "A player retention tool at Derivco focused on engaging and retaining users through targeted campaigns.",
      },
      {
        title: "Additional Achievements",
        bullets: [
          "TOMS: Contributed to Train Operating Management System for Metrorail",
          "English Literacy Game: Created a game initiative for combating English illiteracy using Python and VPython physics engine",
          "DMOCC_IS: Lead developer of incident reporting system for Metrorail",
          "XBOX RPG: Lead developer of collaborative XBOX RPG game with City Varsity animators and UCT developers",
        ],
      },
    ],
  },

  {
    heading: "Personal Projects",
    intro: "I enjoy developing productivity tools and frameworks. Here are some of my favorites:",
    subsections: [
      {
        title: "Trxy",
        description:
          "A social skateboarding community app that allows skaters to challenge each other, track their progress, and share their achievements through an event-driven social platform.",
        stack: ["React Native", "Expo", "Supabase", "PostgreSQL", "Effect-TS", "TypeScript"],
        stackLabel: "Stack",
        links: [
          {
            kind: "site",
            label: "Website: stiproot.github.io/trxy-v2",
            href: "https://stiproot.github.io/trxy-v2/",
          },
          {
            kind: "site",
            label: "Web App: trxy-web.web.app",
            href: "https://trxy-web.web.app/",
          },
          {
            kind: "site",
            label: "iOS: App Store",
            href: "https://apps.apple.com/us/app/trxy/id6753019236",
          },
          {
            kind: "site",
            label: "Android: Google Play",
            href: "https://play.google.com/store/apps/details?id=com.trxy.skateboarding",
          },
          {
            kind: "site",
            label: "Instagram: @trxy.skateboarding",
            href: "https://instagram.com/trxy.skateboarding",
          },
        ],
      },
      {
        title: "TaskTree",
        description:
          "A .NET library for building composable, type-safe task workflows (10K+ NuGet downloads).",
        stack: [".NET"],
        stackLabel: "Stack",
        links: [
          { kind: "repo", label: "GitHub", href: "https://github.com/stiproot/xo-tasktree" },
          {
            kind: "package",
            label: "NuGet",
            href: "https://www.nuget.org/packages/Xo.TaskTree",
          },
        ],
        linksLabel: "Links",
      },
      {
        title: "Lxi",
        description:
          "An AI-powered repository intelligence and collaboration platform that enables semantic code search and natural language querying of codebases.",
        stack: [".NET", "Python", "FastAPI", "Dapr", "MongoDB", "ChromaDB", "React", "TypeScript"],
        stackLabel: "Stack",
        links: [
          {
            kind: "repo",
            label: "github.com/stiproot/lxi",
            href: "https://github.com/stiproot/lxi",
          },
        ],
        linksLabel: "Link",
      },
      {
        title: "mndy",
        description:
          "A data-driven project metrics and analytics platform for software development teams, bridging Azure DevOps and project reporting with real-time insights and behavioral analytics.",
        stack: [
          "Vue 3",
          "TypeScript",
          "Python",
          "FastAPI",
          "Dapr",
          "MongoDB",
          "RabbitMQ",
          "D3.js",
          "Quasar Framework",
        ],
        stackLabel: "Stack",
        links: [
          {
            kind: "repo",
            label: "github.com/stiproot/mndy",
            href: "https://github.com/stiproot/mndy",
          },
        ],
        linksLabel: "Link",
      },
      {
        title: "F4Lang",
        description: "An agentic workflow orchestration framework, based on TaskTree.",
        stack: [".NET", "SemanticKernel", "Dapr"],
        stackLabel: "Stack",
        links: [
          {
            kind: "repo",
            label: "github.com/stiproot/f4-lang",
            href: "https://github.com/stiproot/f4-lang",
          },
        ],
        linksLabel: "Link",
      },
      {
        title: "Xo.AzDO.Engine",
        description:
          "A .NET library for automating Azure DevOps operations including work item management, query creation, and dashboard automation with intelligent widget positioning. Published to NuGet for public use.",
        bullets: [
          "Key Features:",
          "Work item lifecycle management (create, clone hierarchies, update)",
          "WIQL query building and execution",
          "Automated dashboard creation with 10+ widget types",
          "Intelligent collision-free widget positioning using rectangle packing algorithm",
          "Multi-initiative dashboard support with dynamic layouts",
          "Architecture: Provider-Processor pattern with dependency injection, workflow orchestration for complex multi-step operations, and async/await throughout for optimal performance",
        ],
        stack: [".NET 8.0", "Azure DevOps REST API", "Xo.TaskTree", "Xo.Algo.RectangleCluster"],
        stackLabel: "Stack",
        links: [
          { kind: "repo", label: "GitHub", href: "https://github.com/stiproot/xo-azdo-cli" },
          {
            kind: "package",
            label: "NuGet",
            href: "https://www.nuget.org/packages/Xo.AzDO.Engine",
          },
        ],
        linksLabel: "Links",
      },
      {
        title: "LangChain Lab",
        description:
          'A personal "laboratory" for experimenting with LangChain, LangGraph and OpenAI. Working on a codegen graph that generates solutions from architecture blueprints to code.',
        stack: ["C4", "LangChain", "LangGraph", "OpenAI", "Python"],
        stackLabel: "Stack",
        links: [
          {
            kind: "repo",
            label: "github.com/stiproot/langchain-lab/tree/main/graphs/codegen",
            href: "https://github.com/stiproot/langchain-lab/tree/main/graphs/codegen",
          },
        ],
        linksLabel: "Link",
      },
      {
        title: "ASQ",
        description:
          'Real-estate property web app for people to provide "micro services" in renovating their homes.',
        stack: ["Angular", ".NET", "MySQL", "Zoom", "Node.js"],
        stackLabel: "Stack",
        links: [
          {
            kind: "repo",
            label: "github.com/stiproot/asq",
            href: "https://github.com/stiproot/asq",
          },
        ],
        linksLabel: "Link",
      },
    ],
  },

  {
    heading: "Employment Experience",
    subsections: [
      {
        title: "Derivco",
        subRoles: [
          { role: "Senior Developer", dates: "2022 - present" },
          { role: "Intermediate Developer", dates: "2019 - 2022" },
        ],
      },
      {
        title: "Healthbridge",
        role: "Full Stack Developer",
        dates: "2017 - 2019",
        bullets: [
          "Evolved and maintained healthcare systems",
          "Contributed to iHealth, SASA, and ASSM projects",
        ],
        stack: ["ASP.NET", "MVC", "MSSQL", "AngularJS", "Kendo", "Telerik", "JavaScript"],
        stackLabel: "Technologies",
      },
      {
        title: "InfoSys Software Solutions",
        role: "Full Stack Developer",
        dates: "2014 - 2017",
        bullets: [
          "Built and maintained web applications for various clients",
          "Worked on large-scale government projects including Metrorail and TOMS",
          "Developed web applications using ASP.NET, MVC, AngularJS, MSSQL",
          "Collaborated in an Agile development environment",
        ],
      },
    ],
  },

  {
    heading: "Education",
    subsections: [
      {
        title: "University of Cape Town",
        description: "BSc in Computer Science and Computer Game Development (incomplete)",
        dates: "2011 - 2013",
      },
    ],
  },

  {
    heading: "Interests",
    subsections: [
      {
        title: "Interests",
        content: "Cycling, running, gym, yoga, mathematics, physics, skateboarding, and coding.",
      },
    ],
  },

  {
    heading: "Contact",
    subsections: [
      {
        title: "Contact",
        links: [
          { kind: "site", label: "Email", href: "mailto:code.stip.si@gmail.com" },
          { kind: "repo", label: "GitHub", href: "https://github.com/stiproot" },
          { kind: "site", label: "LinkedIn", href: "https://www.linkedin.com/in/stiproot" },
        ],
      },
    ],
  },
];

export const cvData = {
  hero: {
    name: "Simon Stipcich",
    title: "Software Engineer, Technical Lead and Solutions Architect",
    tagline:
      "Mathematics & Physics background. Building productivity tools and scalable solutions.",
    actions: [
      {
        label: "GitHub",
        href: "https://github.com/stiproot",
        variant: "repo" as const,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/stiproot",
        variant: "neutral" as const,
      },
      {
        label: "Download CV",
        href: "/simon-stipcich-cv.pdf",
        variant: "dark" as const,
      },
      {
        label: "Email",
        href: "mailto:code.stip.si@gmail.com",
        variant: "neutral" as const,
      },
    ],
  },
  sections,
  articles: [],
};
