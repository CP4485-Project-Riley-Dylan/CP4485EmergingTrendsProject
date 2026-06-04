import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function AddTransactionModal({ onClose }) {
  const [transactionType, setTransactionType] = useState("");


  return (
    <>
      {/* Header */}
      <div>
        <h2>Add Transaction</h2>
        <button
          type="button"
          onClick={onClose}
        >
          X
        </button>
      </div>
      {/* Transaction data */}
      <form>
        <label>Type</label>
        <div>
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
        </div>
        <div>
          <label>
            Description
            <input
              type="text"
              name="description"
            />
          </label>
        </div>
        <label>
          Category
          <select>
            {/* Hardcoded until functionality to add categories exists. */}
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="$0.00"
          />
        </label>
        <label>
          Date
          <input
            type="date" />
        </label>
        {/* Bottom buttons */}
        <div>
          <button
            type="button"
            onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            onClick={onClose}>
            Add Transaction
          </button>
        </div>
      </form>
    </>
  )
}