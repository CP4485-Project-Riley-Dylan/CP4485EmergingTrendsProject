import clientPromise from '@/lib/mongodb';
import { getUserId } from '@/lib/auth';
import { generateBudgetInsights } from '@/lib/ai/generateBudgetInsights';

export async function GET() /*Switched to GET request for testing until a user uploads data to it otherwise 405 error*/ {
    const userId = await getUserId();
    if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise;
    const db = client.db("budgetApp");
    const transactions = await db.collection('transactions').find({ userId: userId }).toArray();

    let response;
    try {
        response = await generateBudgetInsights(transactions);

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