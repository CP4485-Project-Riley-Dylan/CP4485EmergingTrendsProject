"use server"

import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { getOauthUrl } from "./googleOauthUtils";
import { getUserId } from "@/lib/auth";

async function getCollection(collection) {
    let client = await clientPromise;
    let db = client.db("budgetApp");
    return db.collection(collection);
}

export async function addTransaction(formData) {
    const userId = await getUserId();
    if (!userId) {
        redirect("/");
    }

    const collection = await getCollection("transactions");
    await collection.insertOne(
        {
            name: formData.get("description"),
            category: formData.get("category"),
            date: formData.get("date"),
            amount: parseFloat(formData.get("amount")),
            type: formData.get("transactionType"),
            userId: userId
        }
    )
    redirect("/transactions");
}

export async function editTransaction(formData) {
    const userId = await getUserId();
    if (!userId) {
        redirect("/");
    }

    const collection = await getCollection("transactions");
    await collection.updateOne(
        { _id: new ObjectId(formData.get("_id")), userId: userId },
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
    redirect("/transactions");
}

export async function deleteTransaction(formData) {
    const collection = await getCollection("transactions")
    await collection.deleteOne(
        { _id: new ObjectId(formData.get("_id")) }
    )
    redirect("/transactions");
}

export async function signInWithGoogle() {
    const url = getOauthUrl();
    redirect(url);
}