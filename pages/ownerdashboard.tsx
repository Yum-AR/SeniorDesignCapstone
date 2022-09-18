import React from 'react'
import NavBar from '../components/Nav/NavBar'
import OwnerDashboardSidebar from '../components/Sections/OwnerDashboardSidebar'

const OwnerDashboard: React.FC = () => {
  return (
        <div className="h-[100vh]">
            <NavBar />
            <OwnerDashboardSidebar />

        </div>
  )
}

export default OwnerDashboard
