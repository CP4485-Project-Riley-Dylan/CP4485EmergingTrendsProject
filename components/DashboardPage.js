"use client";
import { useState, useEffect } from "react";

export default function DashboardPage() {

  const [user, setUser] = useState("");
  let [transactions, setTransactions] = useState([]);

  {/*GET request fetch call for user*/ }
  const getUser = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    setUser(data);
  }

  {/*GET request fetch call (add [id] later once we have accounts)*/ }
  const getTransactions = async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    setTransactions(data);
  }

  {/*Load transactions*/ }
  useEffect(() => {
    getUser();
    getTransactions();
  }, []);

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <section className="mb-6 sm:mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl mb-1 text-foreground">Hello, {user.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Here's your financial overview.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="rounded-3xl bg-card p-5 border border-border">Charts will go here</div>
        <div className="rounded-3xl bg-card p-5 border border-border">Charts will go here</div>
        <div className="rounded-3xl bg-card p-5 border border-border">Charts will go here</div>
        <div className="rounded-3xl bg-card p-5 border border-border">Charts will go here</div>
      </section>

      <section className="mb-6 sm:mb-8 rounded-3xl bg-card p-5 border border-border">
        <p className="text-sm sm:text-base text-foreground">AI SECTION WILL GO HERE</p>
      </section>

      <section className="rounded-2xl p-4 sm:p-6 bg-card border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 gap-3">
          <h2 className="font-semibold text-base sm:text-lg text-foreground">Recent Transactions</h2>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-primary bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
            View All
          </button>
        </div>
        <ul className="space-y-3">
          {transactions.map((transaction, index) => (
            <li key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-2 sm:px-3 py-3 rounded-xl hover:bg-muted transition-colors cursor-default">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">{transaction.name}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{transaction.category}</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{transaction.date}</div>
              <span className="font-mono font-semibold text-sm text-foreground sm:ml-auto">${transaction.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}