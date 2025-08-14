import { useState } from 'react';
import PersonalDetailsForm from '../../components/profile/update-forms/PersonalDetailsForm';
import AchievementsForm from '../../components/profile/update-forms/AchievementsForm';
import EducationForm from '../../components/profile/update-forms/EducationForm';
import ExperienceForm from '../../components/profile/update-forms/ExperienceForm';
import SkillsForm from '../../components/profile/update-forms/SkillsForm';
import SocialLinksForm from '../../components/profile/update-forms/SocialLinksForm';

const profileUpdaterFormTabs = [
  { name: 'details', label: 'Personal Details' },
  { name: 'achievements', label: 'Achievements' },
  { name: 'education', label: 'Education' },
  { name: 'experience', label: 'Experience' },
  { name: 'skills', label: 'Skills' },
  { name: 'social-links', label: 'Social Links' },
];

const ProfileUpdateContainer = () => {
  const [activeTab, setActiveTab] = useState('details');

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return <PersonalDetailsForm />;
      case 'achievements':
        return <AchievementsForm />;
      case 'education':
        return <EducationForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'skills':
        return <SkillsForm />;
      case 'social-links':
        return <SocialLinksForm />;
      default:
        return null;
    }
  };

  return (
    <div className="common-box-container">
      <h1>Profile Settings</h1>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 flex-col md:flex-row items-center justify-center">
        {profileUpdaterFormTabs.map(tab => (
          <button
            key={tab.name}
            className={`py-2 px-4 text-base font-medium ${
              activeTab === tab.name ? 'active-tab' : 'inactive-tab'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default ProfileUpdateContainer;
