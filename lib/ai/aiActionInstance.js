import "server-only"
import { RECOMMEND_COUNT } from './movie-recommendation-schema';
import {
    generateText,
    NoObjectGeneratedError,
    Output,
} from 'ai';

import { groqModels } from "./groq-models";
import { movieRecommewndationSchema } from "./movie-recommendation-schema";

const SYSTEM_PROMPT = `
        You are a movie recommendation assistant.

        Based on the user's movie collection and their rating for each movie, recommend ${RECOMMEND_COUNT} real movies they have
        not already been watched.  A rating of 1 or 2 is a movie the user didn't like.  
        A rating of 3 shows the user found the movie mediocre and a rating of 4 or 5 means the user loved the move

        Rules:
        -Do not recommend movies the user has already watcvhed
        -Consider ratings when ratings are available
        -Provide a brief reason for each recommendation
        -Identify which watched movies influenced each recommendation
        -Do not invent movie titles
    `.trim()

export async function recommendMovies( movies) {
    console.log(movies);
    const viewingHistory = movies.filter( (movie) =>
        movie && typeof movie.title === "string" &&
        movie.title.trim() !== ""
    ).slice(0, 50);

    try {
        const result = await generateText( {
            model: groqModels("openai/gpt-oss-20b"),
            system: SYSTEM_PROMPT,
            prompt: `The user has watched these movies:
                ${JSON.stringify(viewingHistory, null, 2)}`,
                output: Output.object({
                    name: "movie_recommendations",
                    description: "Movie recommendations based on a user's viewing history",
                    schema: movieRecommewndationSchema,
                }),
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
    catch( error ) {
        if( NoObjectGeneratedError.isInstance(error)) {
            console.error("AI output did not match the schema", 
            { cause: error.cause,
              text: error.text,
              usage: error.usage,
            })
            throw new Error("The AI returned invalid recommendation data");
        }
        throw error;
    }

}