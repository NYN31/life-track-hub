import React from 'react';
import { useGetUserByEmailQuery } from '../../features/user/userApi';
import Spinner from '../../components/common/Spinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { IUser, IUserDetails } from '../../types/user';
import PersonalInfoSection from '../../components/profile/details-sections/PersonalInfoSection';
import SkillsSection from '../../components/profile/details-sections/SkillsSection';
import AchievementsSection from '../../components/profile/details-sections/AchievementsSection';
import EducationsSection from '../../components/profile/details-sections/EducationsSection';
import ExperiencesSection from '../../components/profile/details-sections/ExperiencesSection';
import SocialLinksSection from '../../components/profile/details-sections/SocialLinksSection';

const UserProfileViewContainer: React.FC = () => {
  const email = localStorage.getItem('email');
  const { data, isLoading, error } = useGetUserByEmailQuery(email);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message="Failed to load user profile." />;
  if (!data) return <ErrorMessage message="No user data found." />;

  const user: IUser = data;
  const userDetails = user.userDetails as IUserDetails;

  return (
    <div className="common-box-container">
      <h1>Profile Details</h1>

      <PersonalInfoSection user={user} userDetails={userDetails} />
      <SkillsSection skills={userDetails?.skills} />
      <AchievementsSection achievements={userDetails?.achievements} />
      <EducationsSection educations={userDetails?.educations} />
      <ExperiencesSection experiences={userDetails?.experiences} />
      <SocialLinksSection socialLinks={userDetails?.socialLinks} />
    </div>
  );
};

export default UserProfileViewContainer;
