import {z} from 'zod';

const AppConfigurationSchema = z.object({
    MONGO_URI: z.string(),
    JWT_ACCESS_TOKEN: z.string(),
    JWT_REFRESH_TOKEN: z.string(),
    JWT_ACCESS_EXPIRY: z.number(),
    JWT_REFRESH_EXPIRY: z.number(),
});

export const {
    MONGO_URI,
    JWT_ACCESS_TOKEN,
    JWT_REFRESH_EXPIRY,
    JWT_ACCESS_EXPIRY,
    JWT_REFRESH_TOKEN
} = AppConfigurationSchema.parse({
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
    JWT_ACCESS_EXPIRY: Number(process.env.JWT_ACCESS_EXPIRY),
    JWT_REFRESH_EXPIRY: Number(process.env.JWT_REFRESH_EXPIRY),
});
