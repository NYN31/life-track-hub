package com.lifetrackhub.constant.utils;

import java.time.Instant;
import java.util.Random;
import java.util.UUID;

public class RandomUtil {
    private final static String ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789";

    private final static Random RANDOM = new Random();

    public static String randomStringOfLength(int length) {
        StringBuilder builder = new StringBuilder();
        int bound = ALPHABET.length();

        for (int i = 0; i < length; i++) {
            int next = RANDOM.nextInt(bound);
            builder.append(ALPHABET.charAt(next));
        }

        return builder.toString();
    }

    public static String getUUId() {
        return UUID.randomUUID().toString();
    }

    public static String randomUUIDWithTimestamp() {
        String uuid = RandomUtil.getUUId();
        long timestamp = Instant.now().toEpochMilli();

        return timestamp + "-" + uuid;
    }

    public static Instant extractTimestampFromUUID(String resetToken) {
        String[] tokens = resetToken.split("-", 2);
        return Instant.ofEpochMilli(Long.parseLong(tokens[0]));
    }
}
