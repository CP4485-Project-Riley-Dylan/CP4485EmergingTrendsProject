"use client";
import DataCard from "@/components/DataCard";
import BudgetVsExpenses from "@/components/BudgetVsExpenses";
import { useState } from "react";

export default function Analytics() {
  const [averageMonthlySpend, setAverageMonthlySpend] = useState("$0.00");

  return (
    <main className="ml-0 md:ml-64 min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <section className="mb-8">
        <h1 className="text-2xl font-medium">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Understand your spending habits over time.</p>
      </section>

      {/* Data Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {DataCard("AVERAGE MONTHLY SPEND", averageMonthlySpend)}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-base font-medium text-foreground">Budget vs Expenses</h2>
          <p className="text-xs text-muted-foreground mt-0.5 mb-6">Monthly income vs spending</p>
          <BudgetVsExpenses />
        </div>
      </section>

    </main>
  );
}