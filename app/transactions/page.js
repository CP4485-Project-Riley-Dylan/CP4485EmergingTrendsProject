import TransactionsPage from "@/components/transactionsPage";
import { getUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const userId = await getUserId();
  if (!userId) {
    redirect("/");
  }
  return <TransactionsPage />;
}