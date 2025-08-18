import { IBase } from './common';

export interface IUser extends IBase {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  loginType: string;
  accountStatus: string;
  accountType: string;
  profileImagePath?: string;
  userDetails: IUserDetails | null;
  createdDate: string; // ISO string for Instant
  lastModifiedDate: string; // ISO string for Instant
}

export interface IUserDetails {
  objective: string;
  profileImagePath: string;
  cvPdfPath: string;
  skills: ISkill[];
  experiences: IExperience[];
  educations: IEducation[];
  achievements: IAchievement[];
  socialLinks: ISocialLink[];
}

export interface ISkill {
  skillName: string;
  skillExperienceYear: number;
  skillCompetency: string;
}

export interface IExperience {
  organizationName: string;
  designation: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
}

export interface IEducation {
  institutionName: string;
  courseName: string;
  isPresent: boolean;
  startYear: number;
  endYear: number;
  result: number;
}

export interface IAchievement {
  achievementTitle: string;
  description: string;
  link: string;
}

export interface ISocialLink {
  socialPlatformName: string;
  link: string;
}
