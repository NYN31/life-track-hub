import React from 'react';
import { FiGlobe } from 'react-icons/fi';
import { ISocialLink } from '../../../types/user';

interface SocialLinksSectionProps {
  socialLinks?: ISocialLink[];
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  socialLinks,
}) => {
  if (!socialLinks || socialLinks.length === 0) return null;
  return (
    <section className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 lg:p-8 border border-purple-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-4">
        <FiGlobe /> Social Media
      </h3>
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg font-semibold shadow-sm hover:bg-purple-100 hover:text-purple-900 transition"
          >
            <FiGlobe /> {link.socialPlatformName}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialLinksSection;
