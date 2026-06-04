import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function AddTransactionModal({ onClose }) {
  const [transactionType, setTransactionType] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2>Add Transaction</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">

          {/* Type Toggle */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Type</label>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="transactionType"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="sr-only"
                />
                <span className={`block text-center py-2.5 text-sm font-medium transition-colors
                  ${transactionType === "expense"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted"}`}>
                  Expense
                </span>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="transactionType"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="sr-only"
                />
                <span className={`block text-center py-2.5 text-sm font-medium transition-colors
                  ${transactionType === "income"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted"}`}>
                  Income
                </span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted-foreground">Description</label>
            <input
              type="text"
              name="description"
              placeholder="e.g. Whole Foods Market"
              className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted-foreground">Category</label>
            <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount + Date */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm text-muted-foreground">Amount ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm text-muted-foreground">Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity"
            >
              Add Transaction
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}