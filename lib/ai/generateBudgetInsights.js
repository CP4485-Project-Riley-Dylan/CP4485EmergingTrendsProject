import "server-only"
import {
    generateText,
    Output,
    NoOutputGeneratedError,
} from 'ai';

import { groqModels } from "./groqModels";
import { budgetInsightsSchema } from "./budgetInsightsZodSchema";


//Prompt the AI receives from the system, not from the user.
const SYSTEM_PROMPT = `
        You are a budgeting assistant. You will be given a user's transactions
        as JSON, each with a category, amount, type ("income" or "expense"),
        and date. Analyze their spending and produce budget insights that
        strictly match the provided schema.
    `.trim()

export async function generateBudgetInsights(transactions) {
    try {
        const result = await generateText({
            model: groqModels("openai/gpt-oss-20b"),
            output: Output.object({ schema: budgetInsightsSchema }),
            system: SYSTEM_PROMPT,
            prompt: `Here are the user's transactions:\n${JSON.stringify(transactions)}`,
            maxRetries: 0,
            providerOptions: {
                groq: {
                    reasoningEffort: "low",
                },
                maxOutputTokens: 2500
            },
        });

        console.log(result);
        return result.output;
    }
    catch (error) {
        if (NoOutputGeneratedError.isInstance(error)) {
            console.error("AI output did not match the schema",
                {
                    cause: error.cause,
                })
            throw new Error("The AI returned invalid data");
        }
        throw error;
    }

}
