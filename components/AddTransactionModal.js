import { useState } from "react";

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
            <option value="Income">💼 Income</option>
            <option value="Groceries">🛒 Groceries</option>
            <option value="Food &amp; Drink">🍽️ Food &amp; Drink</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Housing">🏠 Housing</option>
            <option value="Health">💊 Health</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Shopping">📦 Shopping</option>
            <option value="Utilities">💡 Utilities</option>
            <option value="Other">📁 Other</option>
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
      </form>
    </>
  )
}