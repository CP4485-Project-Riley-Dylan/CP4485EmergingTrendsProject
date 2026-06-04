"use client";
import AddTransactionModal from "@/components/AddTransactionModal";
import { useState } from "react";

export default function Page() {
  //Tab logic
  const [isOpen, setIsOpen] = useState(false);

  // Transactions (hardcoded)
  const TRANSACTIONS = [
    ["Starbucks", "Food & Drink", "Today", 23.92],
    ["Subway", "Food & Drink", "May 3", 31.65],
    ["Netflix", "Entertainment", "May 2", 9.99]
  ]
  //Data affected by transations
  const [income, setIncome] = useState("$0.00");
  const [expenses, setExpenses] = useState("$0.00");
  const [net, setNet] = useState("$0.00");

  return (
    <>
      <main>
        <section className="welcome-section">
          <h1>Transactions</h1>
          <p>All your financial activity in one place.</p>
          <button onClick={() => setIsOpen(true)}> + Add Transaction</button>
          {isOpen && <AddTransactionModal onClose={() => setIsOpen(false)} />}
        </section>
        <section>
          <p>Income</p>
          <p>{income}</p>
          <p>Expenses</p>
          <p>{expenses}</p>
          <p>Net</p>
          <p>{net}</p>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction[0]}</td>
                  <td>{transaction[1]}</td>
                  <td>{transaction[2]}</td>
                  <td>{transaction[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}