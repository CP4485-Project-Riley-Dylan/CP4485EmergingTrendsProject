import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        let client = await clientPromise;
        let db = client.db("budgetApp");
        let transactions = await db.collection('transactions').find({}).toArray();
        return NextResponse.json(transactions);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        let body = await request.json();
        let client = await clientPromise;
        let db = client.db("budgetApp");
        let result = await db.collection("transactions").insertOne(body);
        return NextResponse.json({ ...body, _id: result.insertedId }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ error: e.message }, {status: 500})
    }
}