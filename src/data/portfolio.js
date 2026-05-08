import {
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Globe2,
  LayoutDashboard,
  LineChart,
  Mail,
  MapPin,
  MonitorCog,
  Network,
  Phone,
  PenTool,
  ShieldCheck,
  Sparkles,
  Workflow,
  Smartphone,
  Stethoscope,
  Activity,
  Bot,
  Image,
} from "lucide-react";

export const profile = {
  name: "Md. Abdur Rahman",
  title: "AI Systems Designer & UI/UX Focused CSE Student",
  location: "Bera, Pabna, Bangladesh",
  email: "abdurrahman422487@gmail.com",
  phone: "+8801762531330",
  github: "https://github.com/abdurrahman422",
  linkedin: "https://linkedin.com/in/abdurrahman422",
  summary:
    "Computer Science and Engineering student building thoughtful AI-driven systems, database-backed workflows, and interface concepts for real operational problems.",
  focusAreas: ["AI Automation", "System Architecture", "Database Design", "UI/UX Wireframing"],
  aboutTimeline: [
    { year: "2022", event: "Started CSE at BAUET", detail: "Bangladesh Army University of Engineering & Technology" },
    { year: "2023", event: "First major system design", detail: "MediSync Healthcare — database modeling & interaction flows" },
    { year: "2024", event: "AI & automation shift", detail: "Desktop AI assistant concept + Crisis response architecture" },
    { year: "2025", event: "Full-stack & AI systems", detail: "Feed Mill platform, Mobile reward app, ML projects" },
  ],
};

export const navItems = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "UI/UX",
  "Contact",
];

export const stats = [
  { value: "07+", label: "Academic systems built" },
  { value: "AI", label: "Automation direction" },
  { value: "CSE", label: "BAUET student" },
];

export const skillCategories = [
  {
    title: "Programming",
    icon: Code2,
    items: [
      { name: "C", level: 75 },
      { name: "C++", level: 70 },
      { name: "Python", level: 85 },
      { name: "Java", level: 65 },
      { name: "JavaScript", level: 80 },
    ],
  },
  {
    title: "AI / ML",
    icon: BrainCircuit,
    items: [
      { name: "Machine Learning", level: 72 },
      { name: "Markov Chains", level: 68 },
      { name: "Model Evaluation", level: 75 },
      { name: "Image Processing", level: 70 },
      { name: "Data Structures", level: 82 },
    ],
  },
  {
    title: "Web Development",
    icon: Globe2,
    items: [
      { name: "HTML / CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 78 },
      { name: "Tailwind CSS", level: 85 },
      { name: "REST APIs", level: 70 },
    ],
  },
  {
    title: "Firebase",
    icon: Database,
    items: [
      { name: "Authentication", level: 80 },
      { name: "Realtime DB", level: 82 },
      { name: "Firestore", level: 75 },
      { name: "Hosting", level: 78 },
      { name: "Cloud Functions", level: 65 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: [
      { name: "MySQL", level: 82 },
      { name: "SQL Queries", level: 85 },
      { name: "Schema Design", level: 80 },
      { name: "Firebase Realtime DB", level: 82 },
      { name: "MongoDB", level: 60 },
    ],
  },
  {
    title: "UI / UX",
    icon: PenTool,
    items: [
      { name: "Figma", level: 80 },
      { name: "Wireframing", level: 85 },
      { name: "Prototyping", level: 75 },
      { name: "Design Systems", level: 70 },
      { name: "User Research", level: 65 },
    ],
  },
  {
    title: "Tools",
    icon: MonitorCog,
    items: [
      { name: "Git / GitHub", level: 82 },
      { name: "Android Studio", level: 72 },
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 68 },
      { name: "Notion / Canva", level: 75 },
    ],
  },
];

export const skills = [
  {
    title: "AI & Core CS",
    icon: BrainCircuit,
    items: ["Python", "Data Structures", "Markov Chains", "Model Evaluation", "Image Processing"],
  },
  {
    title: "Software & Web",
    icon: MonitorCog,
    items: ["JavaScript", "React", "HTML", "CSS", "Firebase", "Android Studio"],
  },
  {
    title: "Data Systems",
    icon: Database,
    items: ["MySQL", "SQL", "Firebase Realtime DB", "Schema Design", "Reporting Workflows"],
  },
  {
    title: "Product Thinking",
    icon: PenTool,
    items: ["Figma", "Wireframing", "Documentation", "Project Planning", "Team Collaboration"],
  },
];

export const projects = [
  {
    title: "OS Level Personal Desktop AI Assistant",
    period: "Sep 2024 - Dec 2024",
    icon: Bot,
    category: "AI Automation",
    featured: true,
    description:
      "A privacy-first desktop AI assistant with voice/text command processing, intent detection, and multi-agent automation workflows. Designed as an operating-system-level ecosystem with a multi-page interface for seamless human-AI collaboration.",
    highlights: [
      "Voice & text command processing with intent classification",
      "Multi-agent automation modules (email, search, summarization, scheduling)",
      "Local-first architecture for privacy-preserving computation",
      "Multi-page assistant dashboard with real-time status monitoring",
      "Flowchart-based automation workflow designer",
    ],
    techStack: ["Python", "JavaScript", "React", "Firebase", "NLP", "Speech Recognition", "REST API"],
  },
  {
    title: "Reward Earning Mobile App",
    period: "Oct 2024 - Present",
    icon: Smartphone,
    category: "Mobile Application",
    description:
      "A gamified mobile rewards platform where users earn points through engagement, referrals, and task completions. Built with Firebase backend for real-time data sync and authentication.",
    highlights: [
      "User authentication & profile management via Firebase",
      "Point-based reward system with leaderboards",
      "Real-time data synchronization across devices",
      "Referral tracking and bonus mechanics",
    ],
    techStack: ["Android Studio", "Java", "Firebase Auth", "Firebase Realtime DB", "XML"],
  },
  {
    title: "Feed Mill Management System",
    period: "Jan 2025 - Apr 2025",
    icon: LayoutDashboard,
    category: "Operations Platform",
    description:
      "Centralized production workflow for raw material tracking, batch production, finished goods inventory, sales records, and stock reporting for a feed mill operation.",
    highlights: [
      "Supplier and production schema design with relational integrity",
      "Batch production tracking & inventory visibility",
      "Sales record management with automated stock updates",
      "Reduced manual record dependency by structured reporting",
    ],
    techStack: ["MySQL", "JavaScript", "HTML", "CSS", "PHP", "Bootstrap"],
  },
  {
    title: "National Crisis Response System",
    period: "May 2024 - Aug 2024",
    icon: ShieldCheck,
    category: "Emergency Systems",
    description:
      "System architecture and monitoring workflow for real-time emergency coordination. Includes logical and physical architecture design with sustainability and operational scalability analysis.",
    highlights: [
      "Logical & physical system architecture design",
      "Centralized emergency monitoring dashboard concept",
      "Coordination model with multi-agency communication",
      "Scalability and sustainability analysis framework",
    ],
    techStack: ["Figma", "Draw.io", "Documentation", "System Design", "UML"],
  },
  {
    title: "MediSync Healthcare System",
    period: "Jan 2024 - Apr 2024",
    icon: Stethoscope,
    category: "Healthcare Design",
    description:
      "Healthcare system design project covering database modeling, user interaction flows, workflow diagrams, requirements specification, and implementation planning.",
    highlights: [
      "Comprehensive database schema with patient-provider relationships",
      "User interaction flow mapping for clinical workflows",
      "Impact analysis with compliance considerations",
      "Implementation roadmap with phased delivery",
    ],
    techStack: ["MySQL", "Figma", "Draw.io", "Documentation", "System Design"],
  },
  {
    title: "Machine Learning Projects",
    period: "2024 - Present",
    icon: Activity,
    category: "AI / ML",
    description:
      "Hands-on ML projects including Markov chain models for sequence prediction, classification models, and data preprocessing pipelines.",
    highlights: [
      "Markov chain implementation for sequential data modeling",
      "Classification model evaluation with accuracy metrics",
      "Data preprocessing and feature engineering pipelines",
      "Model performance analysis and visualization",
    ],
    techStack: ["Python", "scikit-learn", "NumPy", "Pandas", "Matplotlib", "Jupyter"],
  },
  {
    title: "Image Processing Projects",
    period: "2024 - Present",
    icon: Image,
    category: "Computer Vision",
    description:
      "Academic image processing projects exploring filtering, edge detection, segmentation, and transformation techniques using Python.",
    highlights: [
      "Spatial and frequency domain filtering implementations",
      "Edge detection using Sobel, Canny, and Laplacian operators",
      "Image segmentation and morphological operations",
      "Feature extraction and transformation pipelines",
    ],
    techStack: ["Python", "OpenCV", "NumPy", "Matplotlib", "scikit-image"],
  },
];

export const experience = [
  {
    title: "B.Sc. in Computer Science & Engineering",
    organization: "Bangladesh Army University of Engineering & Technology",
    period: "Jun 2022 - Present",
    description:
      "Focused on software systems, database architecture, AI concepts, model evaluation, and structured problem solving. Actively building academic and personal projects in AI, web, and mobile domains.",
  },
  {
    title: "Higher Secondary Certificate, Science",
    organization: "Bera Govt. College, Bera, Pabna",
    period: "Jun 2019 - Apr 2021",
    description:
      "Science foundation with coursework in physics, chemistry, and mathematics. Served as the academic base for engineering and technical studies.",
  },
];

export const showcase = [
  {
    title: "AI Command Center",
    icon: LineChart,
    text: "Dense dashboards for monitoring AI assistant modules, real-time logs, and system health metrics.",
    tags: ["Dashboard", "Monitoring", "Real-time"],
  },
  {
    title: "Automation Workflow Designer",
    icon: Workflow,
    text: "Flowchart interface for constructing multi-step automation pipelines with drag-and-drop logic blocks.",
    tags: ["Flowchart", "Automation", "Drag & Drop"],
  },
  {
    title: "Assistant Chat Interface",
    icon: Bot,
    text: "Conversational UI with voice toggle, intent display, and threaded message history for AI interactions.",
    tags: ["Chat", "Voice", "AI"],
  },
  {
    title: "System Architecture Maps",
    icon: Network,
    text: "Visualized database schemas, entity relationships, and system topology for complex backend systems.",
    tags: ["Architecture", "Database", "UML"],
  },
  {
    title: "Healthcare Portal Concepts",
    icon: Stethoscope,
    text: "Patient-provider workflow screens with appointment scheduling, records access, and analytics widgets.",
    tags: ["Healthcare", "Portal", "Dashboard"],
  },
  {
    title: "Crisis Response Dashboard",
    icon: Activity,
    text: "Emergency coordination interface with live alerts, resource tracking, and multi-agency communication feed.",
    tags: ["Emergency", "Monitoring", "Alerting"],
  },
];

export const contactCards = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, icon: Phone },
  { label: "GitHub", value: "github.com/abdurrahman422", href: profile.github, icon: Code2 },
  { label: "Location", value: profile.location, href: "#contact", icon: MapPin },
];
