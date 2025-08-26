'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, CheckCircle, AlertCircle } from 'lucide-react';

interface OrganizationFormData {
    name: string;
    description: string;
    mission: string;
    website: string;
    logo: string;
    location: string;
    contactEmail: string;
    contactPhone: string;
}

export default function CreateOrganizationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<OrganizationFormData>({
        name: '',
        description: '',
        mission: '',
        website: '',
        logo: '',
        location: '',
        contactEmail: '',
        contactPhone: ''
    });

    const [errors, setErrors] = useState<Partial<OrganizationFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (field: keyof OrganizationFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<OrganizationFormData> = {};

        if (!formData.name.trim()) newErrors.name = 'Organization name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';

        // Basic email validation
        if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/organizations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create organization');
            }

            setShowSuccess(true);

            // Redirect to the post opportunity page after a short delay
            setTimeout(() => {
                router.push('/post-opportunity');
            }, 2000);

        } catch (err) {
            console.error('Error creating organization:', err);
            alert(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-green-800 mb-2">Organization Created Successfully!</h2>
                        <p className="text-green-600 mb-4">
                            Your organization has been created and is now ready to post volunteering opportunities.
                        </p>
                        <p className="text-sm text-green-500">
                            Redirecting to post opportunity page...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Create Organization</h1>
                            <p className="text-gray-600 mt-1">
                                Set up your organization to start posting volunteering opportunities
                            </p>
                        </div>
                    </div>
                </div>

                {/* Organization Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Organization Details</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Tell us about your organization
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Organization Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="e.g., Community Food Bank"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={3}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Brief description of your organization"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mission Statement
                                </label>
                                <textarea
                                    value={formData.mission}
                                    onChange={(e) => handleInputChange('mission', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your organization's mission and goals"
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                        placeholder="volunteer@organization.org"
                                    />
                                    {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.contactPhone}
                                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="+1-555-0123"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="City, State or specific address"
                                />
                                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://www.organization.org"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Logo URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.logo}
                                        onChange={(e) => handleInputChange('logo', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://example.com/logo.png"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.push('/post-opportunity')}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Organization'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
