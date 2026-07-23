import { getUserId } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const userId = await getUserId();

  if (!userId) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("budgetApp");
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: { name: 1 } }
  );

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json({ name: user.name });
}