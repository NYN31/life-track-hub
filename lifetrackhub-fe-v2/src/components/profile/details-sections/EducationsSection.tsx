import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import { IEducation } from '../../../types/user';

interface EducationsSectionProps {
  educations?: IEducation[];
}

const EducationsSection: React.FC<EducationsSectionProps> = ({
  educations,
}) => {
  if (!educations || educations.length === 0) return null;
  return (
    <section className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-4">
        <FaUserGraduate /> Educations
      </h3>
      <ul className="space-y-3">
        {educations.map((edu, idx) => (
          <li key={idx} className="border-l-4 border-purple-300 pl-4">
            <div className="font-semibold dark:text-gray-200">
              {edu.courseName} @ {edu.institutionName}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {edu.startYear} - {edu.endYear} | Result: {edu.result}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EducationsSection;
