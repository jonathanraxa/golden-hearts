'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Clock, Users, Star, Calendar, Phone, Mail, ArrowLeft, Building2, ExternalLink, Globe } from 'lucide-react';

export default function OrganizationDetailPage({ params }: { params: { id: string } }) {
    const [isFollowing, setIsFollowing] = useState(false);

    // Mock data - in a real app, this would come from an API
    const organization = {
        id: params.id,
        name: "Community Care Services",
        description: "A nonprofit organization dedicated to providing essential services to seniors and families in need.",
        mission: "To enhance the quality of life for seniors and families by providing compassionate care, support services, and community connections.",
        category: "Social Services",
        location: "San Francisco, CA",
        founded: "1995",
        rating: 4.8,
        volunteers: 150,
        opportunities: 25,
        website: "https://communitycare.org",
        contactEmail: "info@communitycare.org",
        contactPhone: "(555) 123-4567",
        focusAreas: ["Senior Care", "Family Support", "Community Outreach", "Health Services"],
        image: "/api/placeholder/600/400"
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // In a real app, this would update the user's following list
        console.log('Follow status:', !isFollowing);
    };

    return (
        <div className="min-h-screen bg-muted py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/organizations"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Organizations
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-card rounded-lg shadow-sm border border-card p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                                    {organization.category}
                                </span>
                                <div className="flex items-center text-sm text-muted">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    {organization.rating}
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-primary mb-3">
                                {organization.name}
                            </h1>

                            <p className="text-xl text-secondary mb-4">
                                {organization.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary">
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-muted" />
                                    {organization.location}
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-muted" />
                                    Founded {organization.founded}
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-muted" />
                                    {organization.volunteers} volunteers
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={handleFollow}
                                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${isFollowing
                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                <Heart className={`h-4 w-4 ${isFollowing ? 'text-red-500' : ''}`} />
                                <span>{isFollowing ? 'Following' : 'Follow Organization'}</span>
                            </button>

                            {organization.website && (
                                <a
                                    href={organization.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <Globe className="h-4 w-4" />
                                    <span>Visit Website</span>
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mission & Focus Areas */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="card">
                        <h2 className="text-xl font-semibold text-primary mb-4">Our Mission</h2>
                        <p className="text-secondary leading-relaxed">
                            {organization.mission}
                        </p>
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-semibold text-primary mb-4">Focus Areas</h2>
                        <div className="flex flex-wrap gap-2">
                            {organization.focusAreas.map((area, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats & Contact */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="card">
                        <h2 className="text-xl font-semibold text-primary mb-4">Organization Stats</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-secondary">Active Volunteers</span>
                                <span className="text-2xl font-bold text-primary">{organization.volunteers}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-secondary">Open Opportunities</span>
                                <span className="text-2xl font-bold text-primary">{organization.opportunities}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-secondary">Years of Service</span>
                                <span className="text-2xl font-bold text-primary">
                                    {new Date().getFullYear() - parseInt(organization.founded)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>
                        <div className="space-y-3">
                            <div className="flex items-center text-secondary">
                                <Mail className="h-4 w-4 mr-3 text-muted" />
                                <a href={`mailto:${organization.contactEmail}`} className="hover:text-blue-600 transition-colors">
                                    {organization.contactEmail}
                                </a>
                            </div>
                            <div className="flex items-center text-secondary">
                                <Phone className="h-4 w-4 mr-3 text-muted" />
                                <a href={`tel:${organization.contactPhone}`} className="hover:text-blue-600 transition-colors">
                                    {organization.contactPhone}
                                </a>
                            </div>
                            <div className="flex items-center text-secondary">
                                <MapPin className="h-4 w-4 mr-3 text-muted" />
                                {organization.location}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-primary mb-4">
                            Ready to Volunteer with {organization.name}?
                        </h2>
                        <p className="text-secondary mb-6 max-w-2xl mx-auto">
                            Join our community of volunteers and make a difference in your community.
                            Find opportunities that match your skills and interests.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/opportunities"
                                className="btn-primary text-lg px-8 py-3"
                            >
                                Browse Opportunities
                            </Link>
                            <Link
                                href="/register"
                                className="btn-secondary text-lg px-8 py-3"
                            >
                                Join Golden Hearts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
