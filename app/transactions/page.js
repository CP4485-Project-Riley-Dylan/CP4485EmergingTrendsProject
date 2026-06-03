"use client";
import { useState } from "react";

export default function Page() {
  const [income, setIncome] = useState("$0.00");
  const [expenses, setExpenses] = useState("$0.00");
  const [net, setNet] = useState("$0.00");


  return (
    <>
      <main>
        <section className="welcome-section">
          <h1>Transactions</h1>
          <p>All your financial activity in one place.</p>
          <button> + Add Transaction</button>
        </section>
        <section>
          <p>Income</p>
          <p>{income}</p>
          <p>Expenses</p>
          <p>{expenses}</p>
          <p>Net</p>
          <p>{net}</p>
        </section>
      </main>
    </>
  )
}