import React from 'react';
import NavBar from '../../reusableItems/components/NavBar';
import DashboardSidebar from './components/DashboardSidebar';

export default function dashboard() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <NavBar />
      <DashboardSidebar />
    </div>
  );
}
