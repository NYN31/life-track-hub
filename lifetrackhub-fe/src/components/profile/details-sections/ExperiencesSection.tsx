import React from 'react';
import { FiBriefcase, FiGlobe } from 'react-icons/fi';
import { IExperience } from '../../../types/user';
import { lineBreakInsert } from '../../../helper/utils/line-break';

interface ExperiencesSectionProps {
  experiences?: IExperience[];
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  experiences,
}) => {
  if (!experiences || experiences.length === 0) return null;
  return (
    <section className="common-box">
      <h3 className="flex items-center gap-2 mb-4">
        <FiBriefcase /> Experiences
      </h3>
      <ul className="space-y-3">
        {experiences.map((exp, idx) => (
          <li key={idx} className="border-l-4 border-purple-300 pl-4">
            <div className="font-semibold dark:text-gray-200">
              {exp.designation} @ {exp.organizationName}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {exp.startDate} - {exp.endDate || 'Present'}
            </div>
            {exp.description && lineBreakInsert(exp.description) && (
              <p
                className="bg-gray-50 dark:bg-gray-800 text-sm"
                dangerouslySetInnerHTML={{
                  __html: lineBreakInsert(exp.description),
                }}
              />
            )}
            <div className="inline-block mt-2">
              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-view"
                >
                  <FiGlobe /> View
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExperiencesSection;
