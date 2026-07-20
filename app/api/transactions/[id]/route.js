import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getUserId } from "@/lib/auth";

export async function PUT(request, { params }) {
    try {
        let userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }  

        const id = await params;
        let body = await request.json();
        let client = await clientPromise;
        let db = client.db("budgetApp");
        await db.collection("transactions").updateOne(
            { _id: new ObjectId(id.id), userId: userId },
            { $set: body }
        )
        return NextResponse.json({ message: "Updated" })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        let userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }  

        const id = await params;
        let client = await clientPromise;
        let db = client.db("budgetApp");
        await db.collection("transactions").deleteOne({ _id: new ObjectId(id.id), userId: userId });
        return NextResponse.json({ message: "Deleted" });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}