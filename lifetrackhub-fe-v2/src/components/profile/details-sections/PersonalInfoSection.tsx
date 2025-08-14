import React from 'react';
import { IUser, IUserDetails } from '../../../types/user';
import { FiDownload, FiMail, FiUser } from 'react-icons/fi';
import fallbackImg from '../../../assets/blogFallback.png';

interface PersonalInfoSectionProps {
  user: IUser;
  userDetails: IUserDetails;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  user,
  userDetails,
}) => (
  <section className="flex flex-col md:flex-row gap-8">
    <div className="flex-shrink-0 flex flex-col items-center justify-center">
      <img
        src={userDetails?.profileImagePath || fallbackImg}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 dark:border-gray-700 shadow-md"
        onError={e => (e.currentTarget.src = fallbackImg)}
      />
      {userDetails?.cvPdfPath && (
        <a
          href={userDetails?.cvPdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4"
          download
        >
          <FiDownload /> Download CV/Resume
        </a>
      )}
    </div>
    <div className="flex-1 space-y-2 border-l-2 border-purple-300 pl-4">
      <h2 className="text-3xl flex items-center gap-2">
        <FiUser /> {user?.firstname} {user?.lastname}
      </h2>
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-100 text-sm">
        <FiMail /> {user?.email}
      </div>
      <div className="flex gap-4 flex-wrap mt-2">
        <span className="user-account-properties">Role: {user?.role}</span>
        <span className="user-account-properties">
          Status: {user?.accountStatus}
        </span>
        <span className="user-account-properties">
          Type: {user?.accountType}
        </span>
        <span className="user-account-properties">
          Login: {user?.loginType}
        </span>
      </div>
      {userDetails?.objective && (
        <div className="mt-4 text-gray-700 dark:text-gray-400 font-medium">
          <span className="font-semibold text-purple-300">Objective:</span>
          {userDetails?.objective}
        </div>
      )}
    </div>
  </section>
);

export default PersonalInfoSection;
