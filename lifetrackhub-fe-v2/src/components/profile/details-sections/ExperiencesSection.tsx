import React from 'react';
import { FiBriefcase, FiGlobe } from 'react-icons/fi';
import { IExperience } from '../../../types/user';

interface ExperiencesSectionProps {
  experiences?: IExperience[];
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;
  return (
    <section className="bg-white rounded-2xl shadow p-6 border border-purple-100">
      <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2 mb-4">
        <FiBriefcase /> Experiences
      </h3>
      <ul className="space-y-3">
        {experiences.map((exp, idx) => (
          <li key={idx} className="border-l-4 border-purple-300 pl-4">
            <div className="font-semibold">
              {exp.designation} @ {exp.organizationName}
            </div>
            <div className="text-gray-600 text-sm">
              {exp.startDate} - {exp.endDate || 'Present'}
            </div>
            {exp.description && (
              <div className="text-gray-500 text-xs mt-1">
                {exp.description}
              </div>
            )}
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline text-xs flex items-center gap-1 mt-1"
              >
                <FiGlobe /> View
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExperiencesSection; 