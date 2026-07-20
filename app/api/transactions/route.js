import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserId } from "@/lib/auth";

export async function GET() {
    try {
        let userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let client = await clientPromise;
        let db = client.db("budgetApp");
        let transactions = await db.collection('transactions').find({userId: userId}).toArray();
        return NextResponse.json(transactions);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        let userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }  

        let body = await request.json();
        let client = await clientPromise;
        let db = client.db("budgetApp");
        body.userId = userId;
        let result = await db.collection("transactions").insertOne(body);
        return NextResponse.json({ ...body, _id: result.insertedId }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}