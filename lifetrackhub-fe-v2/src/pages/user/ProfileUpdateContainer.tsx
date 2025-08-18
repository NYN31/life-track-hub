import { useState } from 'react';
import PersonalDetailsForm from '../../components/profile/update-forms/PersonalDetailsForm';
import AchievementsForm from '../../components/profile/update-forms/AchievementsForm';
import EducationForm from '../../components/profile/update-forms/EducationForm';
import ExperienceForm from '../../components/profile/update-forms/ExperienceForm';
import SkillsForm from '../../components/profile/update-forms/SkillsForm';
import SocialLinksForm from '../../components/profile/update-forms/SocialLinksForm';
import OnClickButton from '../../components/common/button/OnClickButton';
import { useNavigate } from 'react-router-dom';
import { PROFILE_DETAILS_PATH } from '../../constants/title-and-paths';
import { IoPersonOutline } from 'react-icons/io5';

const profileUpdaterFormTabs = [
  { name: 'details', label: 'Personal Details' },
  { name: 'achievements', label: 'Achievements' },
  { name: 'education', label: 'Education' },
  { name: 'experience', label: 'Experience' },
  { name: 'skills', label: 'Skills' },
  { name: 'social-links', label: 'Social Links' },
];

const ProfileUpdateContainer = () => {
  const navigate = useNavigate();
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
    <div className="common-box-container space-y-4">
      <div className="flex items-center justify-between ">
        <h1>Profile Settings</h1>

        <OnClickButton
          action={() => navigate(`${PROFILE_DETAILS_PATH}`)}
          text="Profile Overview"
          icon={<IoPersonOutline size="18" />}
        />
      </div>
      <div className="tabs">
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
