import React from 'react';
import NavBar from '../../reusableItems/components/NavBar';
import OwnerDashboardSidebar from './components/OwnerDashboardSidebar';

const OwnerDashboard: React.FC = () =>
  <div className="h-[100vh]">
    <NavBar />
    <OwnerDashboardSidebar />

  </div>;
export default OwnerDashboard;
