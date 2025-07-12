import { useState } from 'react';
import PersonalDetailsForm from '../../components/profile/update-forms/PersonalDetailsForm';
import AchievementsForm from '../../components/profile/update-forms/AchievementsForm';
import EducationForm from '../../components/profile/update-forms/EducationForm';
import ExperienceForm from '../../components/profile/update-forms/ExperienceForm';
import SkillsForm from '../../components/profile/update-forms/SkillsForm';
import SocialLinksForm from '../../components/profile/update-forms/SocialLinksForm';

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
    <div className="border border-purple-100 shadow-sm rounded-lg p-4 md:6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <div className="flex border-b border-gray-200 mb-4 flex-col md:flex-row items-center justify-center">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'details'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Personal Details
        </button>
        <button
          className={`ml-4 py-2 px-4 text-sm font-medium ${
            activeTab === 'achievements'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button
          className={`ml-4 py-2 px-4 text-sm font-medium ${
            activeTab === 'education'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button
          className={`ml-4 py-2 px-4 text-sm font-medium ${
            activeTab === 'experience'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
        <button
          className={`ml-4 py-2 px-4 text-sm font-medium ${
            activeTab === 'skills'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button
          className={`ml-4 py-2 px-4 text-sm font-medium ${
            activeTab === 'social-links'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('social-links')}
        >
          Social Links
        </button>
      </div>
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default ProfileUpdateContainer;
