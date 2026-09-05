export const siteConfig = {
  name: "Melvorix",

  tagline: "Automate. Educate. Elevate.",

  description:
    "Tech academy and software studio empowering the next generation of builders and innovators.",

  navigation: [
    {
      label: "Academy",
      href: "#academy",
    },
    {
      label: "AI Automation",
      href: "#academy",
    },
    {
      label: "Cybersecurity",
      href: "#academy",
    },
    {
      label: "Data & Analytics",
      href: "#academy",
    },
    {
      label: "Studio",
      href: "#studio",
    },
    {
      label: "About",
      href: "#about",
    },
  ],

  stats: [
    {
      value: "10K+",
      label: "Students",
    },
    {
      value: "50+",
      label: "Projects",
    },
    {
      value: "25+",
      label: "Mentors",
    },
    {
      value: "95%",
      label: "Success Rate",
    },
  ],

  whyChoose: [
    {
      title: "Industry-Focused",
      description:
        "Learn skills that are in demand and used by top companies.",
    },
    {
      title: "Hands-On Learning",
      description:
        "Real projects, practical labs and expert mentoring.",
    },
    {
      title: "Future Ready",
      description:
        "Stay ahead with AI, automation and emerging technologies.",
    },
    {
      title: "Career Growth",
      description:
        "Build a portfolio that opens doors to real opportunities.",
    },
  ],

    courses: [
    {
      id: "ai-automation",
      number: "01",
      category: "AI / Automation",
      title: "AI Automation",
      description:
        "Build intelligent agents, automate workflows and create systems that work while you sleep.",
      modules: "12 Modules",
      lessons: "48 Lessons",
      price: "20,000 PKR",
      oldPrice: "$199",
      discount: null,
      accent: "indigo",
    },

    {
      id: "cybersecurity",
      number: "02",
      category: "Security",
      title: "Cybersecurity",
      description:
        "Learn practical defensive security, risk management and modern protection systems.",
      modules: "10 Modules",
      lessons: "40 Lessons",
      price: "25,000 PKR",
      oldPrice: "$179",
      discount: null,
      accent: "cyan",
    },

    {
      id: "data-analytics",
      number: "03",
      category: "Data",
      title: "Data Analytics",
      description:
        "Turn raw data into useful insights through analytics, visualization and modern data workflows.",
      modules: "11 Modules",
      lessons: "44 Lessons",
      price: "25,000 PKR",
      oldPrice: "$189",
      discount: null,
      accent: "indigo",
    },

    {
      id: "digital-automation",
      number: "04",
      category: "Marketing / Growth",
      title: "Digital Marketing",
      description:
        "Build modern digital marketing systems using content, SEO, paid media, analytics and automation.",
      modules: "9 Modules",
      lessons: "36 Lessons",
      price: "15,000 PKR",
      oldPrice: "$169",
      discount: null,
      accent: "cyan",
    },

    {
      id: "social-media-automation",
      number: "05",
      category: "Social Media / Automation",
      title: "Social Media Automation",
      description:
        "Learn how to build scalable social media systems using AI, automation, content workflows and data-driven growth strategies.",
      modules: "4 Modules",
      lessons: "16 Lessons",
      price: "15,000 PKR",
      oldPrice: null,
      discount: null,
      accent: "indigo",
    },
  ] as const,

  studioServices: [
    {
      title: "AI Solutions",
      description: "Custom AI systems, agents and intelligent automation.",
    },
    {
      title: "Custom Software",
      description: "Web, mobile and enterprise applications built to scale.",
    },
    {
      title: "Automation Systems",
      description:
        "End-to-end automation that saves time and reduces costs.",
    },
    {
      title: "Data Intelligence",
      description:
        "Analytics, dashboards and predictive insights that drive growth.",
    },
  ],

  testimonials: [
    {
      name: "Ahmed Raza",
      role: "AI Engineer",
      quote:
        "Melvorix changed my career completely. The projects and mentors are next level.",
    },
    {
      name: "Sara Khan",
      role: "Cybersecurity Analyst",
      quote:
        "The cybersecurity course is incredibly practical. I landed my dream job!",
    },
    {
      name: "Ali Hassan",
      role: "Data Analyst",
      quote:
        "The data analytics course teaches exactly what companies look for.",
    },
  ],

  techStack: [
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Tailwind CSS",
    "OpenAI",
    "AWS",
    "Docker",
    "Stripe",
    "Vercel",
  ],

  process: [
    {
      number: "01",
      title: "Discover",
      description:
        "We audit your current stack, map the opportunity and scope an architecture built to last.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "UX flows, brand system and clickable prototypes — signed off before a line of code ships.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "Two-week sprints, staging environments and code reviews on every pull request.",
    },
    {
      number: "04",
      title: "Launch",
      description:
        "Production deploy, monitoring and a handover session so your team owns the system.",
    },
  ],

  faqs: [
    {
      question: "What does a Melvorix engagement actually include?",
      answer:
        "Every studio engagement covers discovery, UX and architecture, full-stack development, QA, deployment and a 30-day post-launch support window — no separately billed surprises.",
    },
    {
      question: "How long does a custom build take?",
      answer:
        "A focused MVP typically ships in 6–8 weeks. Larger, multi-team platform builds run 3–6 months, scoped sprint by sprint so you always know what's shipping next.",
    },
    {
      question: "Can I switch between Academy tracks after enrolling?",
      answer:
        "Yes. Your enrollment covers lifetime access to every track, so you can move between AI Automation, Cybersecurity, Data & Analytics and Digital Automation as your goals change.",
    },
    {
      question: "Do employers recognize the Academy certificate?",
      answer:
        "Every track ends with a portfolio-grade capstone project plus a certificate of completion, and mentors are practicing engineers who can speak directly to your work.",
    },
    {
      question: "We need something enterprise-scale — do you take on projects like that?",
      answer:
        "Yes. Our studio team regularly runs six-figure platform builds with dedicated leads, staged rollouts and direct Slack access throughout — reach out and we'll scope it together.",
    },
  ],

  footer: {
    academy: [
      "All Courses",
      "AI Automation",
      "Cybersecurity",
      "Data & Analytics",
      "Digital Automation",
      "Student Dashboard",
    ],
    studio: [
      "AI Solutions",
      "Custom Software",
      "Automation Systems",
      "Data Intelligence",
      "Our Process",
      "Case Studies",
    ],
    company: ["About Melvorix", "Our Mission", "Careers", "Blog", "Contact Us"],
    support: ["Help Center", "FAQ", "Terms of Service", "Privacy Policy"],
  },
} as const;