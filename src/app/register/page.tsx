'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Eye, EyeOff, User, Mail, Phone, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  availability: string;
  interests: string[];
  experience: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { user, signUp, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    availability: '',
    interests: [],
    experience: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = 3;

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const availableInterests = [
    'Animal Welfare', 'Education', 'Healthcare', 'Environment', 'Community Service',
    'Food Security', 'Housing', 'Transportation', 'Arts & Culture', 'Sports & Recreation',
    'Technology', 'Senior Care', 'Youth Programs', 'Disaster Relief', 'Veterans Support'
  ];

  const experienceLevels = [
    'Beginner - New to volunteering',
    'Some Experience - Volunteered occasionally',
    'Experienced - Regular volunteer',
    'Very Experienced - Long-term volunteer',
    'Professional - Work in nonprofit sector'
  ];

  const availabilityOptions = [
    'Weekdays only',
    'Weekends only',
    'Evenings only',
    'Flexible schedule',
    'One-time events',
    'Regular commitment'
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData);
      
      if (error) {
        setError(error.message);
      } else {
        // The redirect will happen automatically via useEffect
        // No need to manually redirect here
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-2">
            First Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-muted" />
            </div>
            <input
              id="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="input-field pl-10"
              placeholder="Enter your first name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-2">
            Last Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-muted" />
            </div>
            <input
              id="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="input-field pl-10"
              placeholder="Enter your last name"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
          Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-muted" />
          </div>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="input-field pl-10"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-muted" />
            </div>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="input-field pl-10"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-primary mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-muted" />
            </div>
            <input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-primary mb-2">
          Location *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-muted" />
          </div>
          <input
            id="location"
            type="text"
            required
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="input-field pl-10"
            placeholder="City, State or ZIP code"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">Volunteering Preferences</h2>

      <div>
        <label className="block text-sm font-medium text-primary mb-3">
          What are you interested in volunteering for? *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`p-3 text-sm rounded-lg border transition-colors ${formData.interests.includes(interest)
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
            >
              {interest}
            </button>
          ))}
        </div>
        {formData.interests.length > 0 && (
          <p className="text-sm text-muted mt-2">
            Selected: {formData.interests.join(', ')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-primary mb-2">
          What's your volunteering experience level? *
        </label>
        <select
          id="experience"
          required
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className="input-field"
        >
          <option value="">Select your experience level</option>
          {experienceLevels.map((level, index) => (
            <option key={index} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-primary mb-2">
          What's your availability? *
        </label>
        <select
          id="availability"
          required
          value={formData.availability}
          onChange={(e) => handleInputChange('availability', e.target.value)}
          className="input-field"
        >
          <option value="">Select your availability</option>
          {availabilityOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">Account Security</h2>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
          Password *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CheckCircle className="h-5 w-5 text-muted" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="input-field pl-10 pr-12"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-secondary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted mt-1">
          Password must be at least 8 characters long
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CheckCircle className="h-5 w-5 text-muted" />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="input-field pl-10 pr-12"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-secondary transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Almost done!</p>
            <p>By creating an account, you agree to our Terms of Service and Privacy Policy. Your information will be kept secure and used only to connect you with volunteering opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render registration form if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="h-12 w-12 text-red-500" />
            <h1 className="text-3xl font-bold text-primary">Join Golden Hearts</h1>
          </div>
          <p className="text-secondary">
            Create your account and start making a difference in your community
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="card">
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 text-sm font-bold">!</span>
                  </div>
                  <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-card">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-secondary">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-muted hover:text-secondary transition-colors flex items-center justify-center space-x-2"
          >
            <Heart className="h-4 w-4" />
            <span>Back to Golden Hearts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
