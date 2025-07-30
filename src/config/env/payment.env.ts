import {z} from 'zod';

const AppConfigurationSchema = z.object({
    STRIPE_SECRET_KEY: z.string()
});

export const {
 STRIPE_SECRET_KEY
} = AppConfigurationSchema.parse({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
});
