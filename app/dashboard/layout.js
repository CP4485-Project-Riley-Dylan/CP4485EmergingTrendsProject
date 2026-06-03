import Navbar from '@/components/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="ml-64">{children}</div>
    </>
  )
}
