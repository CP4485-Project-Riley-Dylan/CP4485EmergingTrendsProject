"use client";
import AddTransactionModal from "@/components/AddTransactionModal";
import { TRANSACTIONS } from "@/lib/transactions";
import { useState, useEffect } from "react";

export default async function Page() {
  let [isOpen, setIsOpen] = useState(false);
  let [income, setIncome] = useState("$0.00");
  let [expenses, setExpenses] = useState("$0.00");
  let [net, setNet] = useState("$0.00");

  {/*GET request fetch call (add [id] later once we have accounts)*/ }
  const getTransactions = async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    return data;
  }

  {/*Load transactions*/ }
  useEffect(() => {
    getTransactions();
  });


  return (
    <>
      <main className="ml-0 md:ml-64 min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Transactions</h1>
            <p className="text-sm text-muted-foreground mt-1">All your financial activity in one place.</p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary hover:opacity-90 text-primary-foreground text-sm px-4 py-2.5 rounded-lg transition-opacity"
          >
            + Add Transaction
          </button>
          {isOpen && <AddTransactionModal onClose={() => setIsOpen(false)} />}
        </section>

        {/* Summary Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Income</p>
            <p className="text-xl font-semibold text-primary">{income}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Expenses</p>
            <p className="text-xl font-semibold text-destructive">{expenses}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Net</p>
            <p className="text-xl font-semibold text-foreground">{net}</p>
          </div>
        </section>

        {/* Transactions Table */}
        <section className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-4 font-medium">Transaction</th>
                  <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-4 font-medium">Category</th>
                  <th className="text-left text-xs text-muted-foreground uppercase tracking-wide px-6 py-4 font-medium">Date</th>
                  <th className="text-right text-xs text-muted-foreground uppercase tracking-wide px-6 py-4 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{transaction.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{transaction.date}</td>
                    <td className="px-6 py-4 text-right font-semibold text-destructive">
                      ${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}