import { z } from "zod";

export const RECOMMEND_COUNT = 3;

export const movieRecommewndationSchema = 

    z.object({
        recommendations: z.array(
            z.object({ title: z.string().min(1),
                       year: z.number().int().min(1888).max(2100),
                       reason : z.string().min(10).max(300),
                       basedon: z.string().min(1).describe(
    "The exact title of one movie from the user's viewing history that influenced this recommendation"
  ),
                       genre: z.string().min(1),
                       mood: z.enum(["Lighthearted", "Emotional", "Suspenseful", "ThroughtProvoking", "ActionFocused"])
            })
        ).length(RECOMMEND_COUNT)
    })