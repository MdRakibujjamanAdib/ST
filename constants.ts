import { Education, Experience, SkillCategory, Award, Language, Project } from './types';

export const RESUME_DATA = {
  name: "Md Rakibujjaman Adib",
  title: "Social Media Manager | Community Manager | Creative Technologist",
  tagline: "Creative, detail-oriented, and highly adaptable with hands-on experience in social media management, community engagement, and AI-powered creative platforms.",
  email: "adizaman71@gmail.com",
  website: "adibx.me",
  location: "Daffodil Smart City, Birulia, Savar, Bangladesh",
  phone: "(+880) 1303031080",
  pdfLink: "/cv.pdf",
};

export const EDUCATION_DATA: Education[] = [
  {
    id: "edu1",
    degree: "BSc in Multimedia and Creative Technology",
    institution: "Daffodil International University",
    year: "2020 - 2024",
    description: "Final Grade: 3.95 - Focus on creative development, AI integration, and digital content creation.",
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp1",
    title: "Social Media Manager",
    organization: "Garena Free Fire - Bangladesh",
    duration: "Nov 2020 - Nov 2024",
    responsibilities: [
      "Managed and moderated social media platforms while gathering community feedback for management.",
      "Proactively collected user feedback and responded to inquiries professionally across social channels.",
      "Engaged with diverse players through WhatsApp groups and Facebook Messenger to understand preferences.",
      "Built and maintained relationships with Free Fire communities through social media channels.",
      "Served as vital link between community and internal teams, offering localized knowledge and insights.",
      "Participated in game localization, partner evaluation, and copywriting projects."
    ]
  },
  {
    id: "exp2",
    title: "Anti-Hack Associate",
    organization: "Garena Free Fire - India",
    duration: "Mar 2022 - Jan 2024",
    responsibilities: [
      "Checked hack files and programs to identify unauthorized game modifications.",
      "Explored and documented new hacks and listed hacking-related content creators for action.",
      "Monitored everything related to hacking and unauthorized modifications in Bangladesh and India.",
      "Helped improve the anti-hack system to provide the best gaming experience."
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Creative & Design Skills",
    skills: [
      { name: "Autodesk Maya & 3D Max", level: 85 },
      { name: "V-Ray Rendering", level: 80 },
      { name: "Adobe Creative Suite", level: 90 },
      { name: "Motion Graphics", level: 85 },
      { name: "Graphic Design", level: 90 }
    ]
  },
  {
    category: "Technical Skills",
    skills: [
      { name: "React & Next.js", level: 88 },
      { name: "Supabase & Backend Development", level: 80 },
      { name: "Prompt Engineering", level: 85 },
      { name: "AI Integration", level: 82 }
    ]
  },
  {
    category: "Management & Communication",
    skills: [
      { name: "Social Media Management", level: 95 },
      { name: "Content Marketing Strategy", level: 90 },
      { name: "Community Management", level: 95 },
      { name: "Creative Writing", level: 88 },
      { name: "Communication", level: 92 }
    ]
  }
];

export const AWARDS_DATA: Award[] = [
  {
    id: "aw1",
    title: "Champion - Pixel to Program: MCT Programming Contest",
    year: "Fall 2024",
    description: "Achieved 1st place in the department-wide programming contest organized by the Department of Multimedia and Creative Technology, DIU. Demonstrated strong problem-solving skills, logic building, and coding proficiency."
  },
  {
    id: "aw2",
    title: "MCT Labs AI - Founder & Lead Developer",
    year: "2024",
    description: "Created an innovative AI-powered creative suite (mctlabs.tech) with modules for Chat, Canvas (image gen), Motion (video gen), Builder, Coder, 3D, and Echo AI assistant. Built using React, Next.js, and Supabase. Personal portfolio at adibx.me."
  }
];

export const LANGUAGES_DATA: Language[] = [
  { language: "Bengali", proficiency: "Native Speaker" },
  { language: "English", proficiency: "B2-C1 (Independent to Proficient User)" },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj1",
    title: "MCT Labs AI",
    role: "Founder & Lead Developer",
    year: "2024 - Present",
    description: "An innovative AI-powered creative suite designed to assist professionals in multimedia, design, and development. Built using React, Next.js, Supabase, and custom backend hosted on Xet.one.",
    technologies: ["React", "Next.js", "Supabase", "AI Models", "TypeScript"],
    link: "https://www.mctlabs.tech/",
    features: [
      "Chat: Creative writing and assistant tasks",
      "Canvas: AI image generation",
      "MCT Motion: AI video generation",
      "Builder: Real-time HTML, CSS, and JavaScript development",
      "Coder: AI-based code execution and debugging",
      "3D: 3D model generation",
      "Echo: Persona-based AI assistant (teachers, historical figures, leaders)"
    ]
  }
];