import React from 'react';
import { motion } from 'framer-motion';
import { Award } from '../types';
import SectionContainer from './SectionContainer';
import { Trophy } from 'lucide-react';

interface AwardsSectionProps {
  awards: Award[];
}

const AwardsSection: React.FC<AwardsSectionProps> = ({ awards }) => {
  return (
    <SectionContainer id="awards" title="Awards & Achievements" icon={<Trophy className="w-6 h-6" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 hover:border-red-600/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-tech text-red-500">{award.title}</h3>
              <span className="text-sm text-gray-500 font-tech">{award.year}</span>
            </div>
            <p className="text-gray-400 text-sm">{award.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default AwardsSection;
