import { Education, Experience, SkillCategory, Award, Language } from './types';

export const RESUME_DATA = {
  name: "Adib",
  title: "Creative Technologist | 3D Artist | AI Developer",
  tagline: "A professional profile from the Upside Down.",
  email: "adib@example.com", // Placeholder
  website: "www.adibs.tech",
  location: "Dhaka, Bangladesh",
  pdfLink: "/cv.pdf",
};

export const EDUCATION_DATA: Education[] = [
  {
    id: "edu1",
    degree: "BSc in Multimedia and Creative Technology",
    institution: "Daffodil International University",
    year: "2020 - 2024",
    description: "Focus on 3D Computer Graphics, HCI, and Interactive Systems.",
  },
  {
    id: "edu2",
    degree: "Higher Secondary Certificate",
    institution: "Dhaka College",
    year: "2018 - 2020",
    description: "Science concentration.",
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp1",
    title: "Creative Technologist & UI/UX Designer",
    organization: "TechVerse Solutions",
    duration: "2023 - Present",
    responsibilities: [
      "Designed immersive user interfaces for VR/AR applications.",
      "Developed React-based web platforms integrating 3D assets.",
      "Collaborated with AI teams to visualize neural network outputs."
    ]
  },
  {
    id: "exp2",
    title: "3D Artist (Freelance)",
    organization: "Global Clients",
    duration: "2021 - 2023",
    responsibilities: [
      "Created high-fidelity 3D assets for game environments.",
      "Optimized models for web-based rendering (Three.js/R3F).",
      "Delivered cinematic motion graphics for branding."
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Technical Skills",
    skills: [
      { name: "React / TypeScript", level: 90 },
      { name: "Three.js / WebGL", level: 85 },
      { name: "Python / AI Integration", level: 75 },
      { name: "Tailwind CSS", level: 95 }
    ]
  },
  {
    category: "Creative Skills",
    skills: [
      { name: "3D Modeling (Blender)", level: 90 },
      { name: "UI/UX Design (Figma)", level: 85 },
      { name: "Motion Graphics", level: 80 },
      { name: "Video Editing", level: 70 }
    ]
  }
];

export const AWARDS_DATA: Award[] = [
  {
    id: "aw1",
    title: "Best Creative Tech Project",
    year: "2023",
    description: "Awarded for 'Neural Visions', an AI-driven art installation."
  },
  {
    id: "aw2",
    title: "Hackathon Champion: UI/UX",
    year: "2022",
    description: "First place in National University Hackathon for accessible design."
  }
];

export const LANGUAGES_DATA: Language[] = [
  { language: "English", proficiency: "C1 (Proficient User)" },
  { language: "Bengali", proficiency: "Native Speaker" },
];