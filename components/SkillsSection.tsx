import React from 'react';
import { motion } from 'framer-motion';
import { SkillCategory } from '../types';
import SectionContainer from './SectionContainer';
import { Zap } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <SectionContainer id="skills" title="Skills" icon={<Zap className="w-6 h-6" />}>
      <div className="space-y-8">
        {skills.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-6"
          >
            <h3 className="text-lg font-tech text-red-500 mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    <span className="text-gray-500 text-sm font-tech">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-red-900/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.1 }}
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 relative"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default SkillsSection;
