"use client";
import AddTransactionModal from "@/components/AddTransactionModal";
import { useState } from "react";

export default function Page() {

  //Data affected by transations
  const [income, setIncome] = useState("$0.00");
  const [expenses, setExpenses] = useState("$0.00");
  const [net, setNet] = useState("$0.00");

  //Tab logic
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <main>
        <section className="welcome-section">
          <h1>Transactions</h1>
          <p>All your financial activity in one place.</p>
          <button onClick={() => setIsOpen(true)}> + Add Transaction</button>
          {isOpen && <AddTransactionModal />}
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