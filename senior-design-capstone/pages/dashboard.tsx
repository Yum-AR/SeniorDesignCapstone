import React from 'react';
import NavBar from '../components/Nav/NavBar'
import DashboardSidebar from '../components/Sections/DashboardSidebar';
import DashboardTable from '../components/Sections/DashboardTable';
import { useAuth } from '../firebase/AuthContext';
import { useRouter } from 'next/router';

export default function dashboard() {
  const { currentUser } = useAuth()
  const router = useRouter()
  return (
    <div className="h-[100vh] overflow-hidden">
      <NavBar />
      <DashboardSidebar />
    </div>
  )
}
