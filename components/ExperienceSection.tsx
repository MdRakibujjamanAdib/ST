import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../types';
import SectionContainer from './SectionContainer';
import { Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <SectionContainer id="experience" title="Experience" icon={<Briefcase className="w-6 h-6" />}>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div>
                <h3 className="text-xl font-tech text-red-500 mb-1">{exp.title}</h3>
                <p className="text-gray-300 text-sm">{exp.organization}</p>
              </div>
              <span className="text-sm text-gray-500 font-tech mt-2 md:mt-0">{exp.duration}</span>
            </div>
            <ul className="space-y-2 text-gray-400 text-sm">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">▸</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ExperienceSection;
