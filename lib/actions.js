"use server"

import clientPromise from "@/lib/mongodb"

export async function addTransaction(formData) {
    let client = await clientPromise;
    let db = client.db("budgetApp");
    await db.collection("transactions").insertOne(
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
    let client = await clientPromise;
    let db = client.db("budgetApp");
    const transactionToEdit = await db.collection("transactions").find(
        {
            name: formData.get("description"),
            category: formData.get("category"),
            date: formData.get("date"),
            amount: parseFloat(formData.get("amount")),
            type: formData.get("transactionType")
        }
    )
}