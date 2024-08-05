package com.lifetrackhub.dto.blob;

import com.lifetrackhub.dto.record.user.*;

import java.util.Arrays;

public class UserDetails {
    private String objective;

    private Skill[] skills;

    private byte[] profileImage;

    private byte[] cv;

    private Experience[] experiences;

    private Education[] educations;

    private Achievement[] achievements;

    private SocialLink[] socialLinks;

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public Skill[] getSkills() {
        return skills;
    }

    public void setSkills(Skill[] skills) {
        this.skills = skills;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public byte[] getCv() {
        return cv;
    }

    public void setCv(byte[] cv) {
        this.cv = cv;
    }

    public Experience[] getExperiences() {
        return experiences;
    }

    public void setExperiences(Experience[] experiences) {
        this.experiences = experiences;
    }

    public Education[] getEducations() {
        return educations;
    }

    public void setEducations(Education[] educations) {
        this.educations = educations;
    }

    public Achievement[] getAchievements() {
        return achievements;
    }

    public void setAchievements(Achievement[] achievements) {
        this.achievements = achievements;
    }

    public SocialLink[] getSocialLinks() {
        return socialLinks;
    }

    public void setSocialLinks(SocialLink[] socialLinks) {
        this.socialLinks = socialLinks;
    }

    @Override
    public String toString() {
        return "UserDetails{" +
                "objective='" + objective + '\'' +
                ", skills=" + Arrays.toString(skills) +
                ", experiences=" + Arrays.toString(experiences) +
                ", educations=" + Arrays.toString(educations) +
                ", achievements=" + Arrays.toString(achievements) +
                ", socialLinks=" + Arrays.toString(socialLinks) +
                '}';
    }
}
