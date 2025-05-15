package com.lifetrackhub.dto.record.user;

import com.lifetrackhub.constant.enumeration.Competency;

public record Skill(String skillName, int skillExperienceYear, Competency skillCompetency) {
}