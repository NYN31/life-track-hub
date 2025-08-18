import React from 'react';
import { FiAward, FiGlobe } from 'react-icons/fi';
import { IAchievement } from '../../../types/user';
import { lineBreakInsert } from '../../../helper/utils/line-break';

interface AchievementsSectionProps {
  achievements?: IAchievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
}) => {
  if (!achievements || achievements.length === 0) return null;
  return (
    <section className="common-box">
      <h3 className="flex items-center gap-2 mb-4">
        <FiAward /> Achievements
      </h3>
      <ul className="space-y-3">
        {achievements.map((ach, idx) => (
          <li key={idx} className="border-l-4 border-purple-300 pl-4">
            <div className="font-semibold dark:text-gray-200">
              {ach.achievementTitle}
            </div>
            {ach.description && lineBreakInsert(ach.description) && (
              <p
                className="bg-gray-50 dark:bg-gray-800 text-sm"
                dangerouslySetInnerHTML={{
                  __html: lineBreakInsert(ach.description),
                }}
              />
            )}
            <div className="inline-block mt-2">
              {ach.link && (
                <a
                  href={ach.link}
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

export default AchievementsSection;
