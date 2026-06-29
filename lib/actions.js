"use server"

import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";

async function getCollection(collection) {
    let client = await clientPromise;
    let db = client.db("budgetApp");
    return db.collections(collection);
}

export async function addTransaction(formData) {
    await getCollection("transactions").insertOne(
        {
            name: formData.get("description"),
            category: formData.get("category"),
            date: formData.get("date"),
            amount: parseFloat(formData.get("amount")),
            type: formData.get("transactionType")
        }
    )
}

export async function editTransaction(formData) {
    await getCollection("transactions").updateOne(
        { _id: new ObjectId(formData.get("_id")) },
        {
            $set: {
                name: formData.get("description"),
                category: formData.get("category"),
                date: formData.get("date"),
                amount: parseFloat(formData.get("amount")),
                type: formData.get("transactionType")
            }
        }
    )
}

export async function deleteTransaction(formData) {
    await getCollection("transactions").deleteOne(
        { _id: new ObjectId(formData.get("_id")) }
    )
}
