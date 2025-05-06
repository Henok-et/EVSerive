import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import VerificationRequests from './VerificationRequests';
import UserManagement from './UserManagement';
import PlatformAnalytics from './PlatformAnalytics';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { role } = useAuthStore();

  if (role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="verifications">
        <TabsList>
          <TabsTrigger value="verifications">Service Verification</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Platform Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="verifications">
          <VerificationRequests />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <PlatformAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}