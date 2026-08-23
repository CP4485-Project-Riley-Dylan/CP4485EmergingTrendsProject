"use client";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#3b82f6", // blue
  "#a855f7", // purple
  "#ec4899", // pink
  "#14b8a6", // teal
];

export default function SpendingCharts({ transactions }) {
  const { totalIncome, totalExpenses, netBalance, categoryData, timeSeriesData } = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryTotals = {};
    const dailyTotals = {};

    for (const t of transactions) {
      const amount = Number(t.amount) || 0;

      if (t.type == "income") {
        totalIncome += amount;
      } else {
        totalExpenses += amount;
        const category = t.category || "Uncategorized";
        categoryTotals[category] = (categoryTotals[category] || 0) + amount;
      }

      if (t.type !== "income" && t.date) {
        dailyTotals[t.date] = (dailyTotals[t.date] || 0) + amount;
      }
    }

    const categoryData = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
      .sort((a, b) => b.value - a.value);

    const timeSeriesData = Object.entries(dailyTotals)
      .map(([date, amount]) => ({ date, amount: Number(amount.toFixed(2)) }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      totalIncome: Number(totalIncome.toFixed(2)),
      totalExpenses: Number(totalExpenses.toFixed(2)),
      netBalance: Number((totalIncome - totalExpenses).toFixed(2)),
      categoryData,
      timeSeriesData,
    };
  }, [transactions]);

  const hasData = transactions && transactions.length > 0;

  return (
    <section className="mb-6 sm:mb-8">
      {/* Summary stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="rounded-3xl bg-card p-5 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Total Income
          </p>
          <p className="text-2xl font-bold text-emerald-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="rounded-3xl bg-card p-5 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Total Expenses
          </p>
          <p className="text-2xl font-bold text-red-500">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="rounded-3xl bg-card p-5 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Net Balance
          </p>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-foreground" : "text-red-500"}`}>
            ${netBalance.toFixed(2)}
          </p>
        </div>
        <div className="rounded-3xl bg-card p-5 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Top Category
          </p>
          <p className="text-2xl font-bold text-foreground truncate">
            {categoryData[0]?.name ?? "—"}
          </p>
        </div>
      </div>

      {!hasData ? (
        <div className="rounded-2xl p-8 bg-card border border-border text-center text-muted-foreground">
          Add some transactions to see your spending charts here.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Category breakdown pie chart */}
          <div className="rounded-2xl p-4 sm:p-6 bg-card border border-border">
            <h2 className="font-semibold text-base sm:text-lg text-foreground mb-4">
              Spending by Category
            </h2>
            {categoryData.length === 0 ? (
              <p className="text-muted-foreground text-sm">No expense data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Spending over time line chart */}
          <div className="rounded-2xl p-4 sm:p-6 bg-card border border-border">
            <h2 className="font-semibold text-base sm:text-lg text-foreground mb-4">
              Spending Over Time
            </h2>
            {timeSeriesData.length === 0 ? (
              <p className="text-muted-foreground text-sm">No expense data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </section>
  );
}