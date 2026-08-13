import "server-only"
import {
    generateText,
    NoObjectGeneratedError,
} from 'ai';

import { groqModels } from "./groqModels";
// import { zodSchema } from "./zodSchema";


//Prompt the AI receives from the system, not from the user.
const SYSTEM_PROMPT = `
        Print "Hello user!" and do nothing else.
    `.trim()

export async function doThing() {
    try {
        const result = await generateText({
            model: groqModels("openai/gpt-oss-20b"),
            system: SYSTEM_PROMPT,
            prompt: `Test prompt`/*This part is what the AI receives from user*/,
            maxRetries: 0,
            providerOptions: {
                groq: {
                    reasoningEffort: "low",
                },
                maxOutputTokens: 2500
            },
        });

        console.log(result);
        return result.text;
    }
    catch (error) {
        // if (NoObjectGeneratedError.isInstance(error)) {
        //     console.error("AI output did not match the schema",
        //         {
        //             cause: error.cause,
        //             text: error.text,
        //             usage: error.usage,
        //         })
        //     throw new Error("The AI returned invalid data");
        // }
        throw error;
    }

}