'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Heart, Edit, MapPin, Clock, Star, Calendar, Award, Users, Mail, Phone, Globe } from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location: string;
  bio?: string;
  avatar?: string;
  joinDate: string;
  interests: string[];
  experience?: string;
  availability?: string;
  skills: string[];
  volunteeringHistory: VolunteerHistory[];
  achievements: Achievement[];
  reviews: Review[];
  stats: {
    totalHours: number;
    totalOpportunities: number;
    totalOrganizations: number;
    rating: number;
  };
}

interface VolunteerHistory {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  hours: number;
  status: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  earnedAt: string;
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
  opportunity?: { title: string };
  organization?: { name: string };
  createdAt: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: '',
    interests: [] as string[],
    experience: '',
    availability: '',
    skills: [] as string[]
  });

  const interestOptions = [
    'Food & Nutrition',
    'Education',
    'Environment',
    'Social Services',
    'Animal Welfare',
    'Healthcare',
    'Community Development',
    'Arts & Culture'
  ];

  const experienceOptions = [
    'No experience needed',
    'Some experience',
    'Experienced volunteer',
    'Professional background'
  ];

  const availabilityOptions = [
    'Weekdays only',
    'Weekends only',
    'Flexible schedule',
    'Specific days/times'
  ];

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const userData = await response.json();
        setUser(userData);
        setEditForm({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || '',
          location: userData.location,
          bio: userData.bio || '',
          interests: userData.interests || [],
          experience: userData.experience || '',
          availability: userData.availability || '',
          skills: userData.skills || []
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSkillChange = (skill: string) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(prev => prev ? { ...prev, ...updatedUser } : null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error || 'User not found'}</p>
          </div>
        </div>
      </div>
    );
  }

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
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{user.stats.rating} rating</span>
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
                        value={editForm.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={editForm.lastName}
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
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      rows={3}
                      value={editForm.bio}
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
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium w-24">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium w-24">Phone:</span>
                      <span>{user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium w-24">Location:</span>
                    <span>{user.location}</span>
                  </div>
                  {user.bio && (
                    <div className="pt-2">
                      <p className="text-gray-700">{user.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Volunteering Preferences */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Volunteering Preferences</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editForm.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select
                      name="experience"
                      value={editForm.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select your experience level</option>
                      {experienceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select
                      name="availability"
                      value={editForm.availability}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select your availability</option>
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Areas of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.length > 0 ? (
                        user.interests.map((interest) => (
                          <span key={interest} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No interests specified</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Experience Level</h3>
                    <p className="text-gray-600">{user.experience || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Availability</h3>
                    <p className="text-gray-600">{user.availability || 'Not specified'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Volunteering History */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Volunteering History</h2>
              {user.volunteeringHistory.length > 0 ? (
                <div className="space-y-4">
                  {user.volunteeringHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.organization}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.startDate).toLocaleDateString()} - 
                          {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Present'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {item.hours} hours
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          item.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No volunteering history yet. Start your journey by applying for opportunities!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{user.stats.totalHours}</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{user.stats.totalOpportunities}</div>
                    <div className="text-xs text-gray-600">Opportunities</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{user.stats.totalOrganizations}</div>
                    <div className="text-xs text-gray-600">Organizations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              {user.achievements.length > 0 ? (
                <div className="space-y-3">
                  {user.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon || '🏆'}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{new Date(achievement.earnedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4 text-sm">No achievements yet. Keep volunteering to earn badges!</p>
              )}
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
