'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Heart, Calendar, MapPin, Clock, Star } from 'lucide-react';

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome back, {userProfile?.first_name || user.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-secondary">
            Ready to make a difference in your community? Here's what's happening with your volunteering journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-secondary">Hours Volunteered</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-sm text-secondary">Active Opportunities</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-sm text-secondary">Organizations</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Star className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">4.8</p>
                <p className="text-sm text-secondary">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Upcoming Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-primary font-medium">Completed volunteer shift</p>
                  <p className="text-xs text-secondary">Animal Shelter - 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-primary font-medium">Applied for opportunity</p>
                  <p className="text-xs text-secondary">Community Garden - 1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-primary font-medium">Joined organization</p>
                  <p className="text-xs text-secondary">Local Food Bank - 3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Opportunities */}
          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Upcoming Opportunities</h2>
            <div className="space-y-4">
              <div className="p-4 border border-card rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-primary">Senior Center Assistant</h3>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    Tomorrow
                  </span>
                </div>
                <p className="text-sm text-secondary mb-2">Help with activities and companionship for seniors</p>
                <div className="flex items-center space-x-4 text-xs text-muted">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>2 hours</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>Downtown</span>
                  </span>
                </div>
              </div>
              
              <div className="p-4 border border-card rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-primary">Park Cleanup Event</h3>
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    This Weekend
                  </span>
                </div>
                <p className="text-sm text-secondary mb-2">Help clean up the local community park</p>
                <div className="flex items-center space-x-4 text-xs text-muted">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>3 hours</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>Riverside Park</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="card hover:shadow-md transition-shadow cursor-pointer text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Find Opportunities</h3>
                  <p className="text-sm text-secondary">Browse new volunteering roles</p>
                </div>
              </div>
            </button>
            
            <button className="card hover:shadow-md transition-shadow cursor-pointer text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">My Schedule</h3>
                  <p className="text-sm text-secondary">View upcoming commitments</p>
                </div>
              </div>
            </button>
            
            <button className="card hover:shadow-md transition-shadow cursor-pointer text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">My Profile</h3>
                  <p className="text-sm text-secondary">Update preferences & info</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
