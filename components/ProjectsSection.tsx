import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import SectionContainer from './SectionContainer';
import { Code, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <SectionContainer id="projects" title="Projects" icon={<Code className="w-6 h-6" />}>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-tech text-red-500">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-1">{project.role}</p>
              </div>
              <span className="text-sm text-gray-500 font-tech mt-2 md:mt-0">{project.year}</span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-red-900/20 border border-red-800/30 rounded text-xs font-tech text-red-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="text-sm font-tech text-gray-400 mb-2">Key Features:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-500 mr-2">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ProjectsSection;
