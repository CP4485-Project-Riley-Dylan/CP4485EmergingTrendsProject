import Navbar from '@/components/Navbar'

export default function AddDataLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="ml-64">{children}</div>
    </>
  )
}
