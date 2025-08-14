import React from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { ISkill } from '../../../types/user';

interface SkillsSectionProps {
  skills?: ISkill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <section className="common-box">
      <h3 className="flex items-center gap-2 mb-4">
        <FiBookOpen /> Skills
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-purple-50 border border-purple-200 text-purple-700 p-1 md:p-2 rounded-lg text-sm font-medium shadow-sm w-full sm:w-auto"
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
