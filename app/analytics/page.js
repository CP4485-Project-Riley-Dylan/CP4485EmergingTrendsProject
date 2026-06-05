import DataCard from "@/components/DataCard"
import { useState } from "react"

export default function analytics() {
    // Variable initialization
    const [averageMonthlySpend, setAverageMonthlySpend] = useState("$0.00");

    // Get data card values
    // function setAverageMonthlySpend()

    // Do stuff with it (savings rate, expenses etc over time)

    // Create data points and graph it
    return (
        <>
          <main>
            {/* Header */}
            <section>
              <div>
                <h1>Analytics</h1>
                <p>Understand your spending habits over time.</p>
              </div>
            </section>

            {/* Data cards */}
            <section>
              { DataCard("AVERAGE MONTHLY SPEND", )}
            </section>
          </main>
        </>
    )
}