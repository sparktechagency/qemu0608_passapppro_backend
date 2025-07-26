import {z} from "zod";

export const statisticOverviewSchema = z.object({
    name: z.string(),
    date: z.date(),
})