import {NextReponse} from "next/server";
import clientPromise from "@/lib/mongodb";
import {ObjectId} from "mongodb";

export async function PUT(request, { params }) {
    try {
        let body = await request.json();
        let client = await clientPromise;
        let db = client.db("budgetApp");
        await db.collection("transactions").updateOne(
            { _id: new ObjectId(params.id) },
            { $set: body}
        )
        return NextResponse.json({message:"Updated"})
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        let client = await clientPromise;
        let db = client.db("budgetApp");
        await db.collection("transactions").deleteOne({_id: new ObjectId(params.id)});
        return NextResponse.json( {message:"Deleted"} );
    } catch (e) {
        return NextReponse.json({ error: e.message }, { status: 500 })
    }
}