import { z } from "zod";

export const budgetInsightsSchema = z.object({
    overallSummary: z.string().describe("2-3 sentence summary of the user's spending this period"),
    healthScore: z.number().min(0).max(100).describe("Overall budget health score from 1 to 100"),
    insights: z.array(
        z.object({
            category: z.string().describe("Spending category this insight relates to"),
            observation: z.string().describe("General pattern of this insight. This should help the user understand what to expect from this insight in the future"),
            severity: z.enum(["good", "warning", "critical"]),
            suggestion: z.string().describe("Actionable suggestion for this category"),
        })
    ).min(1).max(5),
    recommendedAction: z.string().describe("The single most important thing the user should do next"),
    projectedMonthlySavings: z.number().describe("Estimated dollars saved per month if suggestions are followed. Make sure the user knows this is an estimate"),
});