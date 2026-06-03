export default async function Page() {
  const response = await fetch('http://localhost:3000/api/user');
  const data = await response.json();
  const transactions = [
    ["Starbucks", "Food & Drink", "Today", 23.92],
    ["Subway", "Food & Drink", "May 3", 31.65],
    ["Netflix", "Entertainment", "May 2", 9.99]
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <section className="mb-6 sm:mb-8">
        <h1 className="font-bold text-xl sm:text-2xl mb-1 text-foreground">Hello, {data.name}</h1>
        <p className="text-sm text-muted-foreground">Here's your financial overview.</p>
      </section>

      <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <p>Charts will go here</p>
      </section>

      <section className="mb-6 sm:mb-8">
        <p>AI SECTION WILL GO HERE</p>
      </section>

      <section className="rounded-2xl p-4 sm:p-6 bg-card border border-border">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="font-semibold text-base text-foreground">Recent Transactions</h2>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
            View All
          </button>
        </div>
        <ul className="space-y-1">
          {transactions.map((item, index) => (
            <li key={index} className="flex items-center gap-3 sm:gap-4 px-2 sm:px-3 py-3 rounded-xl hover:bg-muted transition-colors cursor-default">
              <span>{item[0]}</span>
              <span className="text-xs text-muted-foreground">{item[1]}</span>
              <span className="text-xs text-muted-foreground">{item[2]}</span>
              <span className="font-mono font-semibold text-sm text-foreground ml-auto">${item[3]}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}