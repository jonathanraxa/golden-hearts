'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';
import OpportunityForm from '@/components/OpportunityForm';
import { OpportunityFormData, Organization } from '@/types/opportunity';

export default function PostOpportunityPage() {
    const router = useRouter();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch organizations for the form
    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await fetch('/api/organizations');
                if (response.ok) {
                    const data = await response.json();
                    setOrganizations(data.organizations);
                } else {
                    throw new Error('Failed to fetch organizations');
                }
            } catch (err) {
                console.error('Error fetching organizations:', err);
                setError('Failed to load organizations. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    const handleSubmit = async (data: OpportunityFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/opportunities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create opportunity');
            }

            setShowSuccess(true);

            // Redirect to the opportunities page after a short delay
            setTimeout(() => {
                router.push('/opportunities');
            }, 2000);

        } catch (err) {
            console.error('Error creating opportunity:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/opportunities');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !organizations.length) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                        <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Page</h2>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-green-800 mb-2">Opportunity Posted Successfully!</h2>
                        <p className="text-green-600 mb-4">
                            Your volunteering opportunity has been created and is now visible to potential volunteers.
                        </p>
                        <p className="text-sm text-green-500">
                            Redirecting to opportunities page...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Plus className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Post New Opportunity</h1>
                            <p className="text-gray-600 mt-1">
                                Share your volunteering opportunity with our community
                            </p>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-medium text-blue-900 mb-2">💡 Tips for a Great Post</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Be specific about time commitment and location</li>
                            <li>• Highlight the impact volunteers will make</li>
                            <li>• List clear requirements and benefits</li>
                            <li>• Use engaging, descriptive language</li>
                        </ul>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Organization Check */}
                {organizations.length === 0 ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-lg font-semibold text-yellow-800 mb-2">No Organizations Found</h2>
                        <p className="text-yellow-600 mb-4">
                            You need to create or join an organization before posting opportunities.
                        </p>
                        <div className="space-x-3">
                            <button
                                onClick={() => router.push('/organizations/new')}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                            >
                                Create Organization
                            </button>
                            <button
                                onClick={() => router.push('/organizations')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Browse Organizations
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Opportunity Form */
                    <OpportunityForm
                        organizations={organizations}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )}

                {/* Loading Overlay */}
                {isSubmitting && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Posting your opportunity...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
