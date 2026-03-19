// ============================================================
// PORTFOLIO DATA — Poorna Sai Mukka
// Edit this file to update all content across the portfolio
// ============================================================

export const personalInfo = {
  name: "Poorna Sai Mukka",
  firstName: "Poorna Sai",
  lastName: "Mukka",
  tagline: "Computer Science Engineer",
  subTagline: "AI Enthusiast · Java Developer · Data Explorer",
  bio: "A passionate Computer Science Engineer from LPU, building AI-powered solutions and immersive digital experiences. I thrive at the intersection of technology and creativity.",
  email: "poornasaimukka123@gmail.com",
  mobile: "+91-9381406664",
  linkedin: "https://linkedin.com/in/poorna-sai-mukka-7a660929a/",
  github: "https://github.com/poornasai18",
};

export const skills = [
  { name: "Python", category: "Languages", level: 88, color: "#3776ab" },
  { name: "Java", category: "Languages", level: 85, color: "#f89820" },
  { name: "C / C++", category: "Languages", level: 80, color: "#00599c" },
  { name: "DSA", category: "Languages", level: 82, color: "#a78bfa" },
  { name: "HTML & CSS", category: "Frameworks", level: 90, color: "#e34f26" },
  { name: "SQL", category: "Core CS", level: 78, color: "#00758f" },
  { name: "DBMS", category: "Core CS", level: 75, color: "#38bdf8" },
  { name: "OS", category: "Core CS", level: 72, color: "#34d399" },
  { name: "Blender", category: "Tools", level: 70, color: "#e87d0d" },
  { name: "Power BI", category: "Tools", level: 75, color: "#f2c811" },
  { name: "Unity", category: "Tools", level: 65, color: "#22d3ee" },
  { name: "GitHub", category: "Tools", level: 85, color: "#6e5494" },
  { name: "Problem-Solving", category: "Soft Skills", level: 92, color: "#f472b6" },
  { name: "Team Player", category: "Soft Skills", level: 90, color: "#818cf8" },
  { name: "Adaptability", category: "Soft Skills", level: 88, color: "#fb923c" },
];

export const projects = [
  {
    id: 1,
    title: "Mental Health Simulator",
    period: "Jun '25 – Jul '25",
    description:
      "A Java-based mental health simulation system that models user emotions and stress levels using rule-based logic and interactive scenarios with adaptive decision-driven pathways.",
    bullets: [
      "Models user emotions and stress levels using rule-based logic and interactive scenarios",
      "Dynamic decision-driven pathways that adapt to user choices for real-life mental wellness simulation",
      "Intuitive GUI with progress tracking, feedback generation, and personalized insights",
    ],
    tech: ["Java", "OOP", "MySQL", "GitHub"],
    github: "https://github.com/poornasai18",
    gradient: "from-purple-600 to-blue-600",
    glowColor: "#7c3aed",
    icon: "🧠",
  },
  {
    id: 2,
    title: "Cricket Score Predictor",
    period: "Jan '25 – May '25",
    description:
      "AI-based cricket score prediction chatbot using machine learning trained on historical match data to forecast innings scores accurately.",
    bullets: [
      "ML model trained on historical match data to forecast innings scores accurately",
      "Complete data preprocessing: cleaning, feature engineering, model tuning",
      "Users can query live score predictions, run-rate trends, and winning probabilities",
    ],
    tech: ["Python", "Pandas", "NumPy", "Sk-learn", "MySQL", "GitHub"],
    github: "https://github.com/poornasai18",
    gradient: "from-cyan-600 to-green-600",
    glowColor: "#0891b2",
    icon: "🏏",
  },
];

export const experience = [
  {
    id: 1,
    type: "training",
    title: "Java with DSA Training",
    organization: "CipherSchools",
    period: "Jun '25 – Jul '25",
    icon: "☕",
    color: "#f89820",
    details: [
      "Core Java, OOP concepts, exception handling, JVM fundamentals",
      "Major data structures: arrays, linked lists, stacks, queues",
      "Algorithms: sorting, graph traversal, greedy & dynamic programming",
    ],
    tech: ["Java", "DSA", "Java Collections Framework"],
  },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech – Computer Science & Engineering",
    institution: "Lovely Professional University",
    location: "Punjab, India",
    period: "Aug '23 – Present",
    grade: "CGPA: 6.16",
    icon: "🎓",
    color: "#6366f1",
  },
  {
    id: 2,
    degree: "Intermediate",
    institution: "Sri Viswa College",
    location: "Andhra Pradesh, India",
    period: "Jun '21 – Mar '23",
    grade: "94.9%",
    icon: "📚",
    color: "#06b6d4",
  },
  {
    id: 3,
    degree: "Matriculation",
    institution: "Sri Chaitanya Techno School",
    location: "Andhra Pradesh, India",
    period: "Jun '20 – Mar '21",
    grade: "98%",
    icon: "🏆",
    color: "#10b981",
  },
];

export const certificates = [
  {
    id: 1,
    title: "Generative AI for All",
    issuer: "Infosys",
    period: "Aug '25",
    icon: "🤖",
    color: "#8b5cf6",
  },
  {
    id: 2,
    title: "JavaScript & React.JS from A to Z BootCamp",
    issuer: "BootCamp",
    period: "Apr '24",
    icon: "⚛️",
    color: "#38bdf8",
  },
  {
    id: 3,
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    period: "Oct '23",
    icon: "🌐",
    color: "#06b6d4",
  },
];

export const achievements = [
  {
    id: 1,
    title: "District Level Badminton Player",
    description: "Represented at district level in competitive badminton.",
    icon: "🏸",
    color: "#f59e0b",
  },
  {
    id: 2,
    title: "3rd Runner Up – Code Your First Game",
    description: "Team achievement at SkillEcted hackathon/competition.",
    icon: "🎮",
    color: "#ec4899",
  },
];
