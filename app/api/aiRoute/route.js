// import { connectToDB } from '@/app/api/db';
// import { ObjectId } from 'mongodb';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'
import { doThing } from '@/lib/ai/aiActionInstance';
// import { recommendMovies } from '@/app/lib/ai/recommend-movies';


export async function GET() /*Switched to GET request for testing until a user uploads data to it otherwise 405 error*/ {
    const cookieStore = await cookies()
    const session = cookieStore.get('token')
    console.log(process.env.JWT_SECRET);
    console.log(session)
    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET)
    let payload = null;
    try {
        ({ payload } = await jwtVerify(session.value, secret))
    }
    catch {
        console.log("issue with jwt api, redirecting to login")
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // const { db } = await connectToDB();

    // const userId = payload.userId;

    // const movieList = await db.collection('movies').find( {userId: new ObjectId(userId)}).toArray();
    // //console.log(movieList);

    // const cleanedMovies = movieList.map( (movie) => ({"title": movie.title, "rating": movie.rating}));

    // //console.log(cleanedMovies);

    // //return Response.json({"status": "testing"})
    let response;
    try {
        response = await doThing();

    }
    catch (error) {
        console.log(error)
        return Response.json({
            error: "Recommendations could not be generated.  Please try again",
        },
            {
                status: 502
            })
    }
    console.log(response);
    return Response.json(response);
}