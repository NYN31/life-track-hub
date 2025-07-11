import React from 'react';
import { FiAward, FiGlobe } from 'react-icons/fi';
import { IAchievement } from '../../../types/user';

interface AchievementsSectionProps {
  achievements?: IAchievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;
  return (
    <section className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100">
      <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2 mb-4">
        <FiAward /> Achievements
      </h3>
      <ul className="space-y-3">
        {achievements.map((ach, idx) => (
          <li key={idx} className="border-l-4 border-purple-300 pl-4">
            <div className="font-semibold">{ach.achievementTitle}</div>
            <div className="text-gray-600 text-sm">{ach.description}</div>
            {ach.link && (
              <a
                href={ach.link}
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

export default AchievementsSection; 