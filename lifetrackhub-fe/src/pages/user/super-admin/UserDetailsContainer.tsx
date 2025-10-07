import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByEmailQuery } from '../../../features/user/userApi';
import Spinner from '../../../components/common/Spinner';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { IUser, IUserDetails } from '../../../types/user';
import PersonalInfoSection from '../../../components/profile/details-sections/PersonalInfoSection';
import SkillsSection from '../../../components/profile/details-sections/SkillsSection';
import AchievementsSection from '../../../components/profile/details-sections/AchievementsSection';
import EducationsSection from '../../../components/profile/details-sections/EducationsSection';
import ExperiencesSection from '../../../components/profile/details-sections/ExperiencesSection';
import SocialLinksSection from '../../../components/profile/details-sections/SocialLinksSection';
import UserUpdateActions from '../../../components/user/update/UserUpdateActions';
import { extractErrorMessage } from '../../../helper/utils/extract-error-message';

const UserDetailsContainer: React.FC = () => {
  const { email } = useParams<{ email: string | undefined }>();

  const { data, isLoading, error } = useGetUserByEmailQuery(email);

  if (isLoading) return <Spinner />;

  const user: IUser = data;
  const userDetails = user?.userDetails as IUserDetails;

  const getErrors = () => {
    if (error) {
      return (
        <ErrorMessage
          message={extractErrorMessage(error) || 'Failed to load user profile.'}
        />
      );
    }

    if (!user || !email) {
      return <ErrorMessage message="User not found." />;
    }

    return null;
  };

  return (
    <div className="common-box-container space-y-4">
      <h1>User Details</h1>

      {getErrors() ?? (
        <>
          <UserUpdateActions email={email || ''} user={user} />

          <PersonalInfoSection user={user} userDetails={userDetails} />
          <SkillsSection skills={userDetails?.skills} />
          <AchievementsSection achievements={userDetails?.achievements} />
          <EducationsSection educations={userDetails?.educations} />
          <ExperiencesSection experiences={userDetails?.experiences} />
          <SocialLinksSection socialLinks={userDetails?.socialLinks} />
        </>
      )}
    </div>
  );
};

export default UserDetailsContainer;
