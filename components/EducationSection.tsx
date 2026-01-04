import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../types';
import SectionContainer from './SectionContainer';
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <SectionContainer id="education" title="Education" icon={<GraduationCap className="w-6 h-6" />}>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div>
                <h3 className="text-xl font-tech text-red-500 mb-1">{edu.degree}</h3>
                <p className="text-gray-300 text-sm">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-500 font-tech mt-2 md:mt-0">{edu.year}</span>
            </div>
            {edu.description && (
              <p className="text-gray-400 text-sm">{edu.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default EducationSection;
