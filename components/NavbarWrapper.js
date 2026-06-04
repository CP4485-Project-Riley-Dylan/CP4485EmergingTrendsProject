'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  if (usePathname() == '/') return null;
  return <Navbar />;
}
