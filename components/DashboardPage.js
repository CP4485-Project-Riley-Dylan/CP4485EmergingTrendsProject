"use client";
import { useState, useEffect } from "react";
import SpendingCharts from "./SpendingCharts";

export default function DashboardPage() {
  const [aiData, setAiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchAiInsight() {
      try {
        const response = await fetch('/api/aiRoute');
        if (!response.ok) {
          throw new Error('Failed to fetch AI insights');
        }
        const data = await response.json();
        setAiData(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAiInsight();
  }, []);

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

      <SpendingCharts transactions={transactions} />

      <div className="insight-container p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-6 mb-12">

      <h3 className="font-extrabold text-2xl mb-6 text-gray-800">AI Financial Insights</h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-blue-500 font-medium animate-pulse">Analyzing your transactions...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          <strong>Error:</strong> {error}
        </div>
      ) : aiData ? (
        <div className="space-y-6">
          
          {/* Top Metrics: Health Score & Savings */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200 shadow-sm">
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Financial Health Score</h4>
              <p className="text-4xl font-black text-blue-900">{aiData.healthScore} <span className="text-lg font-medium text-blue-700">/ 100</span></p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-lg border border-emerald-200 shadow-sm">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Projected Monthly Savings</h4>
              <p className="text-4xl font-black text-emerald-900">${aiData.projectedMonthlySavings}</p>
            </div>
          </div>

          {/* Overall Summary */}
          <div>
            <h4 className="font-bold text-gray-800 text-lg mb-2">Overview</h4>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              {aiData.overallSummary}
            </p>
          </div>

          {/* Detailed Insights Array */}
          {aiData.insights && aiData.insights.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-3">Key Observations</h4>
              <div className="space-y-3">
                {aiData.insights.map((insight, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border-l-4 rounded-r-lg bg-white shadow-sm border-y border-r border-gray-100 ${
                      insight.severity === 'good' ? 'border-l-emerald-500' : 'border-l-amber-500'
                    }`}
                  >
                    <div className="mb-2">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-600 rounded-full">
                        {insight.category}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-2">
                      <span className="font-semibold">Observation:</span> {insight.observation}
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      <span className="font-semibold not-italic">Suggestion:</span> {insight.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Action */}
          <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 shadow-sm">
            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Recommended Action
            </h4>
            <p className="text-indigo-800">{aiData.recommendedAction}</p>
          </div>

        </div>
      ) : (
        <p className="text-gray-500">No insights available right now. Add some transactions to get started!</p>
      )}

    </div>

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