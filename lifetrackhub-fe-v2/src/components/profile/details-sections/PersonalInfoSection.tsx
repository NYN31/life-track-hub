import React from 'react';
import { IUser, IUserDetails } from '../../../types/user';
import { FiDownload, FiMail, FiUser } from 'react-icons/fi';
import fallbackImg from '../../../assets/blogFallback.png';

interface PersonalInfoSectionProps {
  user: IUser;
  userDetails: IUserDetails;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ user, userDetails }) => (
  <section className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-8 border border-purple-100">
    <div className="flex-shrink-0 flex flex-col items-center justify-center">
      <img
        src={userDetails.profileImagePath || fallbackImg}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-md"
        onError={e => (e.currentTarget.src = fallbackImg)}
      />
      {userDetails.cvPdfPath && (
        <a
          href={userDetails.cvPdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold shadow hover:from-purple-700 hover:to-purple-600 transition"
          download
        >
          <FiDownload /> Download CV/Resume
        </a>
      )}
    </div>
    <div className="flex-1 space-y-2">
      <h2 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
        <FiUser /> {user.firstname} {user.lastname}
      </h2>
      <div className="flex items-center gap-2 text-gray-600">
        <FiMail /> {user.email}
      </div>
      <div className="flex gap-4 flex-wrap mt-2">
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
          Role: {user.role}
        </span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
          Status: {user.accountStatus}
        </span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
          Type: {user.accountType}
        </span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
          Login: {user.loginType}
        </span>
      </div>
      {userDetails.objective && (
        <div className="mt-4 text-gray-700">
          <span className="font-semibold">Objective:</span> {userDetails.objective}
        </div>
      )}
    </div>
  </section>
);

export default PersonalInfoSection; 