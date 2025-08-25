'use client';

import { useState } from 'react';
import { Heart, Edit, MapPin, Clock, Star, Calendar, Award, Users } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Portland, OR',
    bio: 'Retired teacher passionate about helping children develop reading skills and supporting community education programs.',
    interests: ['Education', 'Social Services', 'Community Development'],
    experience: 'Experienced volunteer',
    availability: 'Weekdays only',
    joinDate: 'March 2023'
  });

  const volunteeringHistory = [
    {
      id: 1,
      title: 'Library Reading Program',
      organization: 'Public Library',
      date: 'March 2024',
      hours: 24,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Meals on Wheels Delivery',
      organization: 'Community Care Services',
      date: 'January 2024',
      hours: 18,
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Senior Center Activities',
      organization: 'Golden Years Center',
      date: 'December 2023',
      hours: 32,
      status: 'Completed'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Month Milestone',
      description: 'Completed your first month of volunteering',
      date: 'April 2023',
      icon: '🌟'
    },
    {
      id: 2,
      title: '50 Hours of Service',
      description: 'Reached 50 hours of community service',
      date: 'August 2023',
      icon: '🏆'
    },
    {
      id: 3,
      title: 'Community Champion',
      description: 'Recognized for outstanding community contribution',
      date: 'December 2023',
      icon: '👑'
    }
  ];

  const stats = {
    totalHours: 74,
    opportunities: 3,
    organizations: 3,
    rating: 4.9
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile changes
    console.log('Profile updated:', profile);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-gray-600">Member since {profile.joinDate}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{stats.rating} rating</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      rows={3}
                      value={profile.bio}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={handleSave} className="btn-primary">
                      Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Email:</span>
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Phone:</span>
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-gray-700">{profile.bio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Volunteering Preferences */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Volunteering Preferences</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Areas of Interest</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span key={interest} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Experience Level</h3>
                  <p className="text-gray-600">{profile.experience}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Availability</h3>
                  <p className="text-gray-600">{profile.availability}</p>
                </div>
              </div>
            </div>

            {/* Volunteering History */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Volunteering History</h2>
              <div className="space-y-4">
                {volunteeringHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.organization}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.hours} hours
                      </div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${item.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalHours}</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{stats.opportunities}</div>
                    <div className="text-xs text-gray-600">Opportunities</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{stats.organizations}</div>
                    <div className="text-xs text-gray-600">Organizations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Find New Opportunities
                </button>
                <button className="w-full btn-secondary">
                  Update Preferences
                </button>
                <button className="w-full btn-secondary">
                  View Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
