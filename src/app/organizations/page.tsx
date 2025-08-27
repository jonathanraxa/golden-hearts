'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Users, Heart, Building2, Star, ExternalLink } from 'lucide-react';

interface Organization {
    id: string;
    name: string;
    description: string;
    mission: string;
    category: string;
    location: string;
    opportunitiesCount: number;
    rating: number;
    isVerified: boolean;
    logo?: string;
    website?: string;
    founded: string;
    focusAreas: string[];
}

export default function OrganizationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedLocation, setSelectedLocation] = useState('All Locations');

    const organizations: Organization[] = [
        {
            id: '1',
            name: 'Community Care Services',
            description: 'Dedicated to providing essential services to seniors and vulnerable populations in our community.',
            mission: 'To ensure every individual has access to quality care, support, and dignity in their daily lives.',
            category: 'Social Services',
            location: 'San Francisco, CA',
            opportunitiesCount: 15,
            rating: 4.8,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://communitycare.org',
            founded: '1995',
            focusAreas: ['Senior Care', 'Food Security', 'Transportation', 'Social Support']
        },
        {
            id: '2',
            name: 'Green Thumbs Collective',
            description: 'Environmental organization focused on urban gardening, sustainability education, and community green spaces.',
            mission: 'To cultivate environmental awareness and create sustainable, green communities through hands-on gardening and education.',
            category: 'Environment',
            location: 'Oakland, CA',
            opportunitiesCount: 8,
            rating: 4.9,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://greenthumbs.org',
            founded: '2008',
            focusAreas: ['Urban Gardening', 'Environmental Education', 'Sustainability', 'Community Spaces']
        },
        {
            id: '3',
            name: 'Paws & Hearts Shelter',
            description: 'Animal welfare organization providing shelter, care, and adoption services for abandoned and rescued animals.',
            mission: 'To give every animal a chance at a loving home and promote responsible pet ownership.',
            category: 'Animal Welfare',
            location: 'San Jose, CA',
            opportunitiesCount: 12,
            rating: 4.7,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://pawsandhearts.org',
            founded: '2010',
            focusAreas: ['Animal Rescue', 'Pet Adoption', 'Veterinary Care', 'Education']
        },
        {
            id: '4',
            name: 'Literacy First Initiative',
            description: 'Education-focused organization working to improve literacy rates and reading skills across all age groups.',
            mission: 'To empower individuals through literacy, opening doors to education, employment, and personal growth.',
            category: 'Education',
            location: 'Berkeley, CA',
            opportunitiesCount: 6,
            rating: 4.6,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://literacyfirst.org',
            founded: '2003',
            focusAreas: ['Adult Literacy', 'Children\'s Reading', 'ESL Programs', 'Digital Literacy']
        },
        {
            id: '5',
            name: 'HealthBridge Community Clinic',
            description: 'Healthcare organization providing free medical services and health education to underserved communities.',
            mission: 'To bridge healthcare gaps and ensure access to quality medical care for all community members.',
            category: 'Healthcare',
            location: 'Fremont, CA',
            opportunitiesCount: 10,
            rating: 4.8,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://healthbridge.org',
            founded: '2000',
            focusAreas: ['Primary Care', 'Health Education', 'Preventive Care', 'Mental Health']
        },
        {
            id: '6',
            name: 'Arts for All Collective',
            description: 'Cultural organization making arts and creative expression accessible to everyone in the community.',
            mission: 'To inspire creativity, foster cultural understanding, and make the arts accessible to all community members.',
            category: 'Arts & Culture',
            location: 'Palo Alto, CA',
            opportunitiesCount: 7,
            rating: 4.5,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://artsforall.org',
            founded: '2012',
            focusAreas: ['Visual Arts', 'Performing Arts', 'Arts Education', 'Cultural Events']
        },
        {
            id: '7',
            name: 'Tech Mentors Network',
            description: 'Technology organization providing digital skills training and mentorship to help bridge the digital divide.',
            mission: 'To empower individuals with technology skills and create opportunities in the digital economy.',
            category: 'Technology',
            location: 'Mountain View, CA',
            opportunitiesCount: 9,
            rating: 4.7,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://techmentors.org',
            founded: '2015',
            focusAreas: ['Digital Skills', 'Coding Education', 'Tech Mentorship', 'Digital Inclusion']
        },
        {
            id: '8',
            name: 'Sports for Everyone',
            description: 'Recreation organization promoting physical activity and sports participation across all age groups and abilities.',
            mission: 'To make sports and physical activity accessible, enjoyable, and beneficial for everyone in our community.',
            category: 'Sports & Recreation',
            location: 'Redwood City, CA',
            opportunitiesCount: 11,
            rating: 4.4,
            isVerified: true,
            logo: '/api/placeholder/80/80',
            website: 'https://sportsforeveryone.org',
            founded: '2006',
            focusAreas: ['Youth Sports', 'Adaptive Sports', 'Fitness Programs', 'Community Events']
        }
    ];

    const categories = [
        'All Categories',
        'Social Services',
        'Environment',
        'Animal Welfare',
        'Education',
        'Healthcare',
        'Arts & Culture',
        'Technology',
        'Sports & Recreation'
    ];

    const locations = [
        'All Locations',
        'San Francisco, CA',
        'Oakland, CA',
        'San Jose, CA',
        'Berkeley, CA',
        'Fremont, CA',
        'Palo Alto, CA',
        'Mountain View, CA',
        'Redwood City, CA'
    ];

    // Filter organizations based on search and filters
    const filteredOrganizations = organizations.filter(org => {
        const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            org.mission.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'All Categories' || org.category === selectedCategory;
        const matchesLocation = selectedLocation === 'All Locations' || org.location === selectedLocation;

        return matchesSearch && matchesCategory && matchesLocation;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Building2 className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">Organizations</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover amazing organizations making a difference in our community.
                        Find the perfect place to volunteer and make an impact.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search organizations..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location Filter */}
                        <div>
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {locations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredOrganizations.length} of {organizations.length} organizations
                    </p>
                </div>

                {/* Organizations Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredOrganizations.map((org) => (
                        <div key={org.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                            {/* Organization Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-start space-x-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {org.logo ? (
                                            <img src={org.logo} alt={org.name} className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <Building2 className="h-8 w-8 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 truncate">{org.name}</h3>
                                            {org.isVerified && (
                                                <div className="p-1 bg-blue-100 rounded-full">
                                                    <Star className="h-3 w-3 text-blue-600" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                                            {org.category}
                                        </span>
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {org.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="h-3 w-3 mr-1" />
                                            {org.opportunitiesCount} opportunities
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Organization Details */}
                            <div className="p-6 flex flex-col h-full">
                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Mission</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{org.mission}</p>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Focus Areas</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {org.focusAreas.map((area, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom section - always at bottom */}
                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">{org.rating}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Founded {org.founded}</span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <Link
                                            href={`/organizations/${org.id}`}
                                            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            <Heart className="h-4 w-4" />
                                            <span>Learn More</span>
                                        </Link>
                                        {org.website && (
                                            <a
                                                href={org.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                <span>Website</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredOrganizations.length === 0 && (
                    <div className="text-center py-12">
                        <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
                        <p className="text-gray-600 mb-4">
                            Try adjusting your search terms or filters to find what you're looking for.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All Categories');
                                setSelectedLocation('All Locations');
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                            Are you an organization looking to post opportunities?
                        </h2>
                        <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
                            Join our platform and connect with passionate volunteers who want to make a difference in your community.
                        </p>
                        <div className="space-x-4">
                            <Link
                                href="/organizations/new"
                                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                <Building2 className="h-5 w-5" />
                                <span>Create Organization</span>
                            </Link>
                            <Link
                                href="/post-opportunity"
                                className="inline-flex items-center space-x-2 bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                <Heart className="h-5 w-5" />
                                <span>Post Opportunity</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
