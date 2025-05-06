import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Briefcase, Calendar, DollarSign } from 'lucide-react';

export default function PlatformAnalytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalServices: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        { count: totalUsers },
        { count: totalProviders },
        { count: totalServices },
        { count: totalBookings }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('profiles').select('*', { count: 'exact' }).eq('role', 'provider'),
        supabase.from('provider_services').select('*', { count: 'exact' }),
        supabase.from('bookings').select('*', { count: 'exact' })
      ]);

      setStats({
        totalUsers: totalUsers || 0,
        totalProviders: totalProviders || 0,
        totalServices: totalServices || 0,
        totalBookings: totalBookings || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Service Providers',
      value: stats.totalProviders,
      icon: Briefcase,
      color: 'bg-emerald-500'
    },
    {
      title: 'Active Services',
      value: stats.totalServices,
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: DollarSign,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Platform Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}