import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="relative md:fixed left-0 top-0 h-auto md:h-screen w-full md:w-64 bg-slate-950/95 text-slate-100 border-b md:border-b-0 md:border-r border-slate-800 p-6 shadow-xl">

      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="block rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-800/90"
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className="block rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-800/90"
        >
          Transactions
        </Link>
        <Link
          href="/"
          className="block rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-800/90"
        >
          Logout
        </Link>
      </div>
    </nav>
  )
}