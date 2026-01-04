export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Award {
  id: string;
  title: string;
  year: string;
  description: string;
}

export interface Language {
  language: string;
  proficiency: string; // e.g., C2, Native
}

export interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  description: string;
  technologies: string[];
  link?: string;
  features: string[];
}