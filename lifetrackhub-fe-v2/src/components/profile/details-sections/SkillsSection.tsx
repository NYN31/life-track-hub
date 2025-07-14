import React from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { ISkill } from '../../../types/user';

interface SkillsSectionProps {
  skills?: ISkill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <section className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-4">
        <FiBookOpen /> Skills
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
          >
            {skill.skillName}{' '}
            <span className="text-xs text-gray-500">
              ({skill.skillCompetency}, {skill.skillExperienceYear} yrs)
            </span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
