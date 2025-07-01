import { IBase } from './common';

export interface IUser extends IBase {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  loginType: string;
  accountStatus: string;
  accountType: string;
  userDetails: IUserDetails | null;
}

export interface IUserDetails {
  objective: string;
  skills: ISkills[];
  profileImage: any;
  cv: any;
  experiences: IExperience[];
  educations: IEducation[];
  achivemenets: IAchievement[];
  socialLinks: ISocialLink[];
}

export interface ISkills {
  name: string;
  description: string;
}

export interface IExperience {
  name: string;
  yearOfExperience: number;
  description: string;
  link: string;
}

export interface IEducation {
  title: string;
  institution: string;
  graduationStartDate: string;
  graduationEndDate: string;
  result: string;
}

export interface IAchievement {
  title: string;
  description: string;
  link: string;
}

export interface ISocialLink {
  name: string;
  link: string;
}
