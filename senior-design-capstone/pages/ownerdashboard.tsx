import React from 'react';
import NavBar from '../components/Nav/NavBar'
import OwnerDashboardSidebar from '../components/Sections/OwnerDashboardSidebar';
import MenuEdit from '../components/Sections/MenuEdit';
import { useAuth } from '../firebase/AuthContext';
import { useRouter } from 'next/router';
export default function OwnerDashboard() {
    const { currentUser } = useAuth()
    const router = useRouter()
    return (
        <div className="h-[100vh]">
            <NavBar />
            <OwnerDashboardSidebar />

        </div>
    )
}