import TransactionsPage from "@/components/TransactionsPage";
import { getUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const userId = await getUserId();
  if (!userId) {
    redirect("/");
  }
  return <TransactionsPage />;
}