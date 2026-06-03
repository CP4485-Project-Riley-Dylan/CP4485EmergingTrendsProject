import { useState } from "react";

export default function AddTransactionModal() {
  const [transactionType, setTransactionType] = useState("");
  return (
    <>
      <h2>Add Transaction</h2>
      <form>
        <label>Type</label>
        <label>
          <input
            type="radio"
            name="transactionType"
            value="expense"
            checked={transactionType === "expense"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          Expense
        </label>
        <label>
          <input
            type="radio"
            name="transactionType"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          Income
        </label>
      </form>
    </>
  )
}