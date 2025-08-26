'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart, User, Mail, Phone, MapPin, Calendar, Clock, Star, Edit, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    availability: '',
    experience: '',
    interests: [] as string[],
    bio: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userProfile) {
      setEditForm({
        firstName: userProfile.first_name || '',
        lastName: userProfile.last_name || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        dateOfBirth: userProfile.date_of_birth || '',
        availability: userProfile.availability || '',
        experience: userProfile.experience || '',
        interests: userProfile.interests || [],
        bio: userProfile.bio || ''
      });
    }
  }, [userProfile]);

  const handleSave = async () => {
    // TODO: Implement profile update logic
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (userProfile) {
      setEditForm({
        firstName: userProfile.first_name || '',
        lastName: userProfile.last_name || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        dateOfBirth: userProfile.date_of_birth || '',
        availability: userProfile.availability || '',
        experience: userProfile.experience || '',
        interests: userProfile.interests || [],
        bio: userProfile.bio || ''
      });
    }
    setIsEditing(false);
  };

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">My Profile</h1>
              <p className="text-secondary mt-2">
                Manage your personal information and volunteering preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {userProfile?.first_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {userProfile?.first_name} {userProfile?.last_name}
                </h2>
                <p className="text-secondary mb-4">{user.email}</p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted" />
                    <span className="text-sm text-secondary">{userProfile?.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-muted" />
                    <span className="text-sm text-secondary">{userProfile?.availability || 'Availability not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-4 w-4 text-muted" />
                    <span className="text-sm text-secondary">{userProfile?.experience || 'Experience not set'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-xl font-semibold text-primary mb-6">Profile Information</h3>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-medium text-primary mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-secondary">{userProfile?.first_name || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-secondary">{userProfile?.last_name || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-secondary">{userProfile?.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editForm.dateOfBirth}
                          onChange={(e) => setEditForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-secondary">
                          {userProfile?.date_of_birth ? new Date(userProfile.date_of_birth).toLocaleDateString() : 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-primary mb-2">
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-secondary">{userProfile?.location || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Volunteering Preferences */}
                <div>
                  <h4 className="text-lg font-medium text-primary mb-4">Volunteering Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Availability
                      </label>
                      {isEditing ? (
                        <select
                          value={editForm.availability}
                          onChange={(e) => setEditForm(prev => ({ ...prev, availability: e.target.value }))}
                          className="input-field"
                        >
                          <option value="">Select availability</option>
                          <option value="Weekdays only">Weekdays only</option>
                          <option value="Weekends only">Weekends only</option>
                          <option value="Evenings only">Evenings only</option>
                          <option value="Flexible schedule">Flexible schedule</option>
                          <option value="One-time events">One-time events</option>
                          <option value="Regular commitment">Regular commitment</option>
                        </select>
                      ) : (
                        <p className="text-secondary">{userProfile?.availability || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Experience Level
                      </label>
                      {isEditing ? (
                        <select
                          value={editForm.experience}
                          onChange={(e) => setEditForm(prev => ({ ...prev, experience: e.target.value }))}
                          className="input-field"
                        >
                          <option value="">Select experience level</option>
                          <option value="Beginner - New to volunteering">Beginner - New to volunteering</option>
                          <option value="Some Experience - Volunteered occasionally">Some Experience - Volunteered occasionally</option>
                          <option value="Experienced - Regular volunteer">Experienced - Regular volunteer</option>
                          <option value="Very Experienced - Long-term volunteer">Very Experienced - Long-term volunteer</option>
                          <option value="Professional - Work in nonprofit sector">Professional - Work in nonprofit sector</option>
                        </select>
                      ) : (
                        <p className="text-secondary">{userProfile?.experience || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h4 className="text-lg font-medium text-primary mb-4">Interests</h4>
                  {isEditing ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        'Animal Welfare', 'Education', 'Healthcare', 'Environment', 'Community Service',
                        'Food Security', 'Housing', 'Transportation', 'Arts & Culture', 'Sports & Recreation',
                        'Technology', 'Senior Care', 'Youth Programs', 'Disaster Relief', 'Veterans Support'
                      ].map((interest) => (
                        <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editForm.interests.includes(interest)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm(prev => ({ ...prev, interests: [...prev.interests, interest] }));
                              } else {
                                setEditForm(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }));
                              }
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                          />
                          <span className="text-sm text-secondary">{interest}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {userProfile?.interests && userProfile.interests.length > 0 ? (
                        userProfile.interests.map((interest: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-secondary">No interests selected</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
