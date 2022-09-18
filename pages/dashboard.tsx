import React from 'react';
import NavBar from '../components/Nav/NavBar';
import DashboardSidebar from '../components/Sections/DashboardSidebar';

export default function dashboard() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <NavBar />
      <DashboardSidebar />
    </div>
  );
}
