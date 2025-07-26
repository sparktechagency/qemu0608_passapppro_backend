import {z} from "zod";


export const SubmissionSchema = z.object({
    deviceId: z.string(),
    submissionTime: z.string().optional(),
    selectedAirline: z.string(),
    selectedYear: z.number(),
    assessmentStatus: z.enum(["PASS", "FAIL"]),
})