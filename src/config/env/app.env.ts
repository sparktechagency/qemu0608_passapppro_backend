import {z} from 'zod';

const AppConfigurationSchema = z.object({
  PORT: z.number().optional(),
  CLIENT_URL: z.string().optional(),
  NODE_ENV: z.string(),
});

export const {PORT, CLIENT_URL, NODE_ENV} =  AppConfigurationSchema.parse({
  PORT: Number(process.env.PORT) || 5000,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
});
