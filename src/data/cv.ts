export interface TechBadge {
  name: string;
}

export interface Section {
  heading: string;
  subsections: Subsection[];
}

export interface Subsection {
  title: string;
  badges?: TechBadge[];
  content?: string;
  link?: string;
  stack?: string;
  details?: string[];
}

export const cvData = {
  hero: {
    name: 'Simon Stipcich',
    title: 'Software Engineer, Technical Lead and Solutions Architect',
    tagline: 'Mathematics & Physics background. Building productivity tools and scalable solutions.',
    actions: [
      { text: 'View GitHub', link: 'https://github.com/stiproot' },
      { text: 'LinkedIn Profile', link: 'https://www.linkedin.com/in/stiproot' },
      { text: 'Download PDF', link: '/simon-stipcich-cv.pdf' },
      { text: 'Contact', link: 'mailto:code.stip.si@gmail.com' },
    ],
  },

  sections: [
    {
      heading: 'Profile',
      subsections: [
        {
          title: 'Profile',
          content:
            "I'm a software developer with a background in mathematics and physics. My journey in computer science started during my time at UCT, and, well, the rest is history :)",
        },
      ],
    },

    {
      heading: 'Key Skills',
      subsections: [
        {
          title: 'Languages & Technologies',
          badges: [
            { name: 'C#' },
            { name: 'Python' },
            { name: 'JavaScript' },
            { name: 'TypeScript' },
            { name: 'SQL' },
            { name: 'Rust' },
          ],
        },
        {
          title: 'Operating Systems',
          content: '**Preference**: Linux, Mac, Windows (in order of preference)',
        },
        {
          title: 'Tools',
          badges: [
            { name: 'NeoVim' },
            { name: 'Git' },
            { name: 'Docker' },
            { name: 'Kubernetes' },
            { name: 'Claude' },
            { name: 'Bash' },
            { name: 'Powershell' },
          ],
        },
        {
          title: 'CloudOps',
          badges: [
            { name: 'Azure' },
            { name: 'Helm' },
            { name: 'AKS' },
            { name: 'Confluent Cloud' },
            { name: 'Cosmos' },
            { name: 'Terraform' },
            { name: 'ArgoCD' },
            { name: 'Azure DevOps' },
            { name: 'GitHub Workflows' },
          ],
        },
        {
          title: 'Frameworks',
          badges: [
            { name: '.NET' },
            { name: 'Angular' },
            { name: 'IONIC' },
            { name: 'Node.js' },
            { name: 'Vue' },
            { name: 'Dapr' },
            { name: 'Kafka' },
            { name: 'RabbitMQ' },
            { name: 'NATS' },
            { name: 'd3.js' },
            { name: 'LangChain' },
            { name: 'LangGraph' },
            { name: 'SemanticKernel' },
            { name: 'Expo' },
            { name: 'React Native' },
            { name: 'Supabase' },
            { name: 'Effect-TS' },
          ],
        },
        {
          title: 'Databases',
          badges: [
            { name: 'PostgreSQL' },
            { name: 'MySQL' },
            { name: 'MSSQL' },
            { name: 'Couchbase' },
            { name: 'Cosmos' },
            { name: 'MongoDB' },
            { name: 'SQLite' },
          ],
        },
      ],
    },

    {
      heading: 'Key Achievements',
      subsections: [
        {
          title: 'Project "Mandy" - Metrics Dashboard',
          details: [
            '**Role**: Architect & Lead Developer',
            'Created a productivity tool used at Derivco for tracking the health of projects. Designed as a way to move away from a "meeting culture" by providing real-time project insights.',
            '**Architecture**: Microservices with the following stack:',
            '- **Frontend**: d3.js, Vue.js',
            '- **Backend Services**:',
            '  - Python Fast APIs for workflow orchestration and data management',
            '  - Node.js Express API for authentication (Okta integration)',
            '  - .NET API for Azure DevOps proxy',
            '- **Infrastructure**: Dapr runtime, Cosmos DB state store',
          ],
        },
        {
          title: 'APC (Auto Promo Creation)',
          details: [
            '**Role**: Architect & Lead Developer',
            'Leveraging generative AI to build full, production-worthy solutions for automated promotion creation.',
          ],
        },
        {
          title: 'Campaign Manager',
          details: [
            '**Role**: Lead Developer',
            'A player retention tool at Derivco focused on engaging and retaining users through targeted campaigns.',
          ],
        },
        {
          title: 'Additional Achievements',
          details: [
            '- **TOMS**: Contributed to Train Operating Management System for Metrorail',
            '- **English Literacy Game**: Created a game initiative for combating English illiteracy using Python and VPython physics engine',
            '- **DMOCC_IS**: Lead developer of incident reporting system for Metrorail',
            '- **XBOX RPG**: Lead developer of collaborative XBOX RPG game with City Varsity animators and UCT developers',
          ],
        },
      ],
    },

    {
      heading: 'Personal Projects',
      subsections: [
        {
          title: 'Trxy',
          details: [
            'A social skateboarding community app that allows skaters to challenge each other, track their progress, and share their achievements through an event-driven social platform.',
            '- **Stack**: React Native, Expo, Supabase, PostgreSQL, Effect-TS, TypeScript',
            '- **Website**: [stiproot.github.io/trxy-v2](https://stiproot.github.io/trxy-v2/)',
            '- **Web App**: [trxy-web.web.app](https://trxy-web.web.app/)',
            '- **iOS**: [App Store](https://apps.apple.com/us/app/trxy/id6753019236)',
            '- **Android**: [Google Play](https://play.google.com/store/apps/details?id=com.trxy.skateboarding)',
            '- **Instagram**: [@trxy.skateboarding](https://instagram.com/trxy.skateboarding)',
          ],
        },
        {
          title: 'TaskTree',
          details: [
            'A .NET library for building composable, type-safe task workflows (10K+ NuGet downloads).',
            '- **Stack**: .NET',
            '- **Links**: [GitHub](https://github.com/stiproot/xo-tasktree) | [NuGet](https://www.nuget.org/packages/Xo.TaskTree)',
          ],
        },
        {
          title: 'Lxi',
          details: [
            'An AI-powered repository intelligence and collaboration platform that enables semantic code search and natural language querying of codebases.',
            '- **Stack**: .NET, Python, FastAPI, Dapr, MongoDB, ChromaDB, React, TypeScript',
            '- **Link**: [github.com/stiproot/lxi](https://github.com/stiproot/lxi)',
          ],
        },
        {
          title: 'mndy',
          details: [
            'A data-driven project metrics and analytics platform for software development teams, bridging Azure DevOps and project reporting with real-time insights and behavioral analytics.',
            '- **Stack**: Vue 3, TypeScript, Python, FastAPI, Dapr, MongoDB, RabbitMQ, D3.js, Quasar Framework',
            '- **Link**: [github.com/stiproot/mndy](https://github.com/stiproot/mndy)',
          ],
        },
        {
          title: 'F4Lang',
          details: [
            'An agentic workflow orchestration framework, based on TaskTree.',
            '- **Stack**: .NET, SemanticKernel, Dapr',
            '- **Link**: [github.com/stiproot/f4-lang](https://github.com/stiproot/f4-lang)',
          ],
        },
        {
          title: 'Xo.AzDO.Engine',
          details: [
            'A .NET library for automating Azure DevOps operations including work item management, query creation, and dashboard automation with intelligent widget positioning. Published to NuGet for public use.',
            '**Key Features**:',
            '- Work item lifecycle management (create, clone hierarchies, update)',
            '- WIQL query building and execution',
            '- Automated dashboard creation with 10+ widget types',
            '- Intelligent collision-free widget positioning using rectangle packing algorithm',
            '- Multi-initiative dashboard support with dynamic layouts',
            '**Architecture**: Provider-Processor pattern with dependency injection, workflow orchestration for complex multi-step operations, and async/await throughout for optimal performance.',
            '- **Stack**: .NET 8.0, Azure DevOps REST API, Xo.TaskTree, Xo.Algo.RectangleCluster',
            '- **Links**: [GitHub](https://github.com/stiproot/xo-azdo-cli) | [NuGet](https://www.nuget.org/packages/Xo.AzDO.Engine)',
          ],
        },
        {
          title: 'LangChain Lab',
          details: [
            'A personal "laboratory" for experimenting with LangChain, LangGraph and OpenAI. Working on a codegen graph that generates solutions from architecture blueprints to code.',
            '- **Stack**: C4, LangChain, LangGraph, OpenAI, Python',
            '- **Link**: [github.com/stiproot/langchain-lab/tree/main/graphs/codegen](https://github.com/stiproot/langchain-lab/tree/main/graphs/codegen)',
          ],
        },
        {
          title: 'ASQ',
          details: [
            'Real-estate property web app for people to provide "micro services" in renovating their homes.',
            '- **Stack**: Angular, .NET, MySQL, Zoom, Node.js',
            '- **Link**: [github.com/stiproot/asq](https://github.com/stiproot/asq)',
          ],
        },
      ],
    },

    {
      heading: 'Employment Experience',
      subsections: [
        {
          title: 'Derivco',
          details: [
            '**Senior Developer** (2022 - present)',
            '**Intermediate Developer** (2019 - 2022)',
          ],
        },
        {
          title: 'Healthbridge',
          details: [
            '**Full Stack Developer** (2017 - 2019)',
            '- Evolved and maintained healthcare systems',
            '- Contributed to iHealth, SASA, and ASSM projects',
            '- **Technologies**: ASP.NET, MVC, MSSQL, AngularJS, Kendo, Telerik, JavaScript',
          ],
        },
        {
          title: 'InfoSys Software Solutions',
          details: [
            '**Full Stack Developer** (2014 - 2017)',
            '- Built and maintained web applications for various clients',
            '- Worked on large-scale government projects including Metrorail and TOMS',
            '- Developed web applications using ASP.NET, MVC, AngularJS, MSSQL',
            '- Collaborated in an Agile development environment',
          ],
        },
      ],
    },

    {
      heading: 'Education',
      subsections: [
        {
          title: 'University of Cape Town',
          details: [
            'BSc in Computer Science and Computer Game Development (incomplete)',
            '2011 - 2013',
          ],
        },
      ],
    },

    {
      heading: 'Interests',
      subsections: [
        {
          title: 'Interests',
          content:
            'Cycling, running, gym, yoga, mathematics, physics, skateboarding, and coding.',
        },
      ],
    },

    {
      heading: 'Contact',
      subsections: [
        {
          title: 'Contact',
          details: [
            '📧 [Email](mailto:code.stip.si@gmail.com)',
            '💻 [GitHub](https://github.com/stiproot)',
            '💼 [LinkedIn](https://www.linkedin.com/in/stiproot)',
          ],
        },
      ],
    },
  ],
};
