'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Clock, Users, Star, Calendar, Phone, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { getCategoryColor } from '@/lib/utils';

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const [isApplied, setIsApplied] = useState(false);

  // Mock data based on ID - in a real app, this would come from an API
  const getOpportunityData = (id: string) => {
    const opportunities = {
      "1": {
        id: "1",
        title: "Meals on Wheels Delivery",
        organization: "Community Care Services",
        location: "Downtown Area",
        duration: "2-3 hours/week",
        category: "Food & Nutrition",
        rating: 4.8,
        volunteers: 12,
        description: "Deliver nutritious meals to homebound seniors in your community. Flexible scheduling available.",
        longDescription: `Our Meals on Wheels program provides essential nutrition to seniors who are unable to prepare meals for themselves. Volunteers play a crucial role in ensuring these vulnerable members of our community receive healthy, balanced meals and a friendly visit.

Key responsibilities include:
• Pick up prepared meals from our central kitchen
• Deliver meals to assigned homes on your route
• Check on the well-being of recipients
• Report any concerns to program coordinators
• Maintain delivery schedule and route efficiency

This opportunity is perfect for volunteers who enjoy driving, have compassion for seniors, and want to make a direct impact on food security in their community.`,
        requirements: [
          "Valid driver's license and reliable vehicle",
          "Compassion and patience for seniors",
          "Reliability and punctuality",
          "Background check clearance",
          "Commitment to regular weekly schedule"
        ],
        benefits: [
          "Make a direct impact on senior nutrition",
          "Build meaningful relationships with community members",
          "Flexible scheduling options",
          "Mileage reimbursement available",
          "Training and ongoing support provided"
        ],
        schedule: "Monday through Friday, 11:00 AM - 2:00 PM",
        startDate: "Immediate openings available",
        contactPerson: "Maria Rodriguez",
        contactEmail: "maria.rodriguez@communitycare.org",
        contactPhone: "(555) 123-4567"
      },
      "2": {
        id: "2",
        title: "Library Reading Program",
        organization: "Public Library",
        location: "Central Library",
        duration: "1-2 hours/week",
        category: "Education",
        rating: 4.9,
        volunteers: 8,
        description: "Help children develop reading skills by reading stories and assisting with literacy programs.",
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
        contactPhone: "(555) 123-4567"
      },
      "3": {
        id: "3",
        title: "Community Garden Maintenance",
        organization: "Green Thumbs Collective",
        location: "Community Garden",
        duration: "3-4 hours/week",
        category: "Environment",
        rating: 4.7,
        volunteers: 15,
        description: "Maintain community gardens, plant vegetables, and help with garden education programs.",
        longDescription: `Our Community Garden program provides fresh produce to local food banks while teaching sustainable gardening practices to community members. Volunteers help maintain garden plots, assist with educational workshops, and contribute to our mission of food security and environmental education.

Key responsibilities include:
• Planting, watering, and maintaining garden plots
• Harvesting vegetables and preparing them for donation
• Assisting with educational workshops and tours
• Maintaining garden tools and equipment
• Supporting special events and community gatherings

This opportunity is perfect for volunteers who enjoy outdoor work, have an interest in sustainable agriculture, or want to learn more about gardening. No prior experience required - we provide training and tools.`,
        requirements: [
          "Ability to work outdoors in various weather conditions",
          "Physical stamina for gardening activities",
          "Interest in sustainable agriculture",
          "Reliability and punctuality",
          "Commitment to regular weekly schedule"
        ],
        benefits: [
          "Learn sustainable gardening practices",
          "Contribute to local food security",
          "Work outdoors in a beautiful setting",
          "Meet like-minded community members",
          "Take home fresh produce when available"
        ],
        schedule: "Tuesday, Thursday, and Saturday, 9:00 AM - 12:00 PM",
        startDate: "Spring 2024",
        contactPerson: "David Chen",
        contactEmail: "david.chen@greenthumbs.org",
        contactPhone: "(555) 123-4567"
      }
    };

    return opportunities[id as keyof typeof opportunities] || opportunities["2"]; // Default to Library Reading Program
  };

  const opportunity = getOpportunityData(params.id);

  const handleApply = () => {
    setIsApplied(true);
    // In a real app, this would submit an application
    console.log('Applied for opportunity:', opportunity.id);
  };

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/opportunities"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Opportunities
          </Link>
        </div>

        {/* Header */}
        <div className="bg-card rounded-lg shadow-sm border border-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(opportunity.category)}`}>
                  {opportunity.category}
                </span>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 dark:text-yellow-300 mr-1" />
                  {opportunity.rating}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-primary mb-3">
                {opportunity.title}
              </h1>

              <p className="text-xl text-secondary mb-4">
                {opportunity.organization}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {opportunity.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {opportunity.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {opportunity.volunteers} volunteers
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleApply}
                disabled={isApplied}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${isApplied
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4" />
                    <span>Apply Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">About This Opportunity</h2>
          <p className="text-secondary leading-relaxed mb-4">
            {opportunity.description}
          </p>
          <p className="text-secondary leading-relaxed whitespace-pre-line">
            {opportunity.longDescription}
          </p>
        </div>

        {/* Requirements & Benefits */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Requirements</h2>
            <ul className="space-y-2">
              {opportunity.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Benefits</h2>
            <ul className="space-y-2">
              {opportunity.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Heart className="h-4 w-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Schedule & Contact */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Schedule & Details</h2>
            <div className="space-y-3">
              <div className="flex items-center text-secondary">
                <Clock className="h-4 w-4 mr-3" />
                <span><strong>Schedule:</strong> {opportunity.schedule}</span>
              </div>
              <div className="flex items-center text-secondary">
                <Calendar className="h-4 w-4 mr-3" />
                <span><strong>Start Date:</strong> {opportunity.startDate}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center text-secondary">
                <Mail className="h-4 w-4 mr-3 text-muted" />
                <a href={`mailto:${opportunity.contactEmail}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {opportunity.contactEmail}
                </a>
              </div>
              <div className="flex items-center text-secondary">
                <Phone className="h-4 w-4 mr-3 text-muted" />
                <a href={`tel:${opportunity.contactPhone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {opportunity.contactPhone}
                </a>
              </div>
              <div className="flex items-center text-secondary">
                <MapPin className="h-4 w-4 mr-3 text-muted" />
                {opportunity.location}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Join our community of volunteers and help make a positive impact in your community.
              This opportunity is waiting for someone just like you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleApply}
                disabled={isApplied}
                className={`btn-primary text-lg px-8 py-3 ${isApplied ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <Link
                href="/opportunities"
                className="btn-secondary text-lg px-8 py-3"
              >
                Browse Other Opportunities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
