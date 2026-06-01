export default async function Page() {
  const response = await fetch('http://localhost:3000/api/user');
  const data = await response.json();
  const transactions = [
    ["Starbucks", "Food & Drink", "Today", 23.92],
    ["Subway", "Food & Drink", "May 3", 31.65],
    ["Netflix", "Entertainment", "May 2", 9.99]
  ];

  return (
    <main>
      <section className="welcome-section">
        <h1>Hello, {data.name}</h1>
        <p>Here's your financial overview.</p>
      </section>

      <section className="dashboard-elements-Section">
        <p>Charts will go here</p>
      </section>

      <section className="ai-section">
        <p>AI SECTION WILL GO HERE</p>
      </section>
      <section className="transactions-section">
        <h2>Recent Transactions</h2>
        <button>View All</button>
        <ul>
          {transactions.map((item, index) => (
            <li key={index}>
              <span>{item[0]}</span>
              <span>{item[1]}</span>
              <span>{item[2]}</span>
              <span>${item[3]}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}