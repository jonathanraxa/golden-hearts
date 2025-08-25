'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Clock, Users, Star, Calendar, Phone, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { getCategoryColor } from '@/lib/utils';

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const [isApplied, setIsApplied] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const opportunity = {
    id: params.id,
    title: "Library Reading Program",
    organization: "Public Library",
    location: "Central Library",
    duration: "1-2 hours/week",
    category: "Education",
    rating: 4.9,
    volunteers: 8,
    description: "Help children develop reading skills by reading stories and assisting with literacy programs. This program serves children from ages 3-8 and focuses on building a love for reading through interactive storytelling sessions.",
    longDescription: `Our Library Reading Program is designed to help young children develop essential literacy skills in a fun and engaging environment. Volunteers work with children one-on-one or in small groups, reading age-appropriate books and engaging in related activities.

Key responsibilities include:
• Reading stories to children aged 3-8
• Assisting with literacy-based activities and crafts
• Helping children select appropriate books
• Supporting library staff during program sessions
• Maintaining a positive and encouraging environment

This opportunity is perfect for volunteers who enjoy working with children and have a passion for education. No prior teaching experience is required - we provide training and ongoing support.`,
    requirements: [
      "Patience and enthusiasm for working with children",
      "Good reading skills and clear pronunciation",
      "Reliability and punctuality",
      "Background check clearance (provided by library)",
      "Commitment to at least 6 months of volunteering"
    ],
    benefits: [
      "Make a meaningful impact on children's literacy development",
      "Gain experience in early childhood education",
      "Build relationships with families in your community",
      "Access to library resources and events",
      "Flexible scheduling options"
    ],
    schedule: "Tuesdays and Thursdays, 3:00 PM - 5:00 PM",
    startDate: "September 1, 2024",
    contactPerson: "Sarah Mitchell",
    contactEmail: "sarah.mitchell@library.org",
    contactPhone: "(555) 123-4567",
    image: "/api/placeholder/600/400"
  };

  const handleApply = () => {
    setIsApplied(true);
    // In a real app, this would submit an application
    console.log('Applied for opportunity:', opportunity.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/opportunities" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Opportunities
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(opportunity.category)}`}>
                  {opportunity.category}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  {opportunity.rating}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {opportunity.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                {opportunity.organization}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.volunteers} volunteers
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              {!isApplied ? (
                <button
                  onClick={handleApply}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Apply Now
                </button>
              ) : (
                <div className="flex items-center text-green-600 font-medium">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Application Submitted
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Opportunity</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{opportunity.description}</p>
                <p className="text-gray-700">{opportunity.longDescription}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {opportunity.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
              <ul className="space-y-2">
                {opportunity.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Schedule</h4>
                  <p className="text-gray-600">{opportunity.schedule}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Start Date</h4>
                  <p className="text-gray-600">{opportunity.startDate}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Time Commitment</h4>
                  <p className="text-gray-600">{opportunity.duration}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Contact Person</h4>
                  <p className="text-gray-600">{opportunity.contactPerson}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Email</h4>
                  <a 
                    href={`mailto:${opportunity.contactEmail}`}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {opportunity.contactEmail}
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Phone</h4>
                  <a 
                    href={`tel:${opportunity.contactPhone}`}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {opportunity.contactPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Organization Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Organization</h3>
              <p className="text-gray-600 mb-4">
                The Public Library is committed to promoting literacy and lifelong learning in our community. 
                We serve over 50,000 residents and offer a wide range of educational programs and resources.
              </p>
              <Link 
                href={`/organizations/${opportunity.organization.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn more about this organization →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
