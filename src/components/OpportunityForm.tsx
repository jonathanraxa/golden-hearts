'use client';

import { useState } from 'react';
import { Plus, X, Calendar, MapPin, Clock, Users, Tag } from 'lucide-react';
import { OpportunityFormData, Organization } from '@/types/opportunity';

interface OpportunityFormProps {
    organizations: Organization[];
    onSubmit: (data: OpportunityFormData) => void;
    onCancel: () => void;
    initialData?: Partial<OpportunityFormData>;
    isEditing?: boolean;
}

export default function OpportunityForm({
    organizations,
    onSubmit,
    onCancel,
    initialData = {},
    isEditing = false
}: OpportunityFormProps) {
    const [formData, setFormData] = useState<OpportunityFormData>({
        title: '',
        description: '',
        longDescription: '',
        category: '',
        location: '',
        duration: '',
        startDate: '',
        endDate: '',
        requirements: [''],
        benefits: [''],
        skills: [''],
        maxVolunteers: '',
        organizationId: '',
        ...initialData
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const categoryOptions = [
        'Food & Nutrition',
        'Education',
        'Environment',
        'Social Services',
        'Animal Welfare',
        'Healthcare',
        'Community Development',
        'Arts & Culture',
        'Technology',
        'Sports & Recreation',
        'Emergency Response',
        'Other'
    ];

    const handleInputChange = (field: keyof OpportunityFormData, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleArrayFieldChange = (field: 'requirements' | 'benefits' | 'skills', index: number, value: string) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayField = (field: 'requirements' | 'benefits' | 'skills') => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeArrayField = (field: 'requirements' | 'benefits' | 'skills', index: number) => {
        if (formData[field].length > 1) {
            const newArray = formData[field].filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, [field]: newArray }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
        if (!formData.organizationId) newErrors.organizationId = 'Organization is required';

        // Validate array fields
        if (formData.requirements.length === 0 || formData.requirements.every(r => !r.trim())) {
            newErrors.requirements = 'At least one requirement is needed';
        }
        if (formData.benefits.length === 0 || formData.benefits.every(b => !b.trim())) {
            newErrors.benefits = 'At least one benefit is needed';
        }
        if (formData.skills.length === 0 || formData.skills.every(s => !s.trim())) {
            newErrors.skills = 'At least one skill is needed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Filter out empty strings from arrays
            const cleanedData = {
                ...formData,
                requirements: (formData.requirements as string[]).filter((r: string) => r.trim()),
                benefits: (formData.benefits as string[]).filter((b: string) => b.trim()),
                skills: (formData.skills as string[]).filter((s: string) => s.trim())
            };
            onSubmit(cleanedData);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                    {isEditing ? 'Edit Opportunity' : 'Post New Opportunity'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    Share details about your volunteering opportunity to attract the right volunteers
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="e.g., Food Bank Volunteer"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-300' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select a category</option>
                                {categoryOptions.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Short Description *
                        </label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-300' : 'border-gray-300'
                                }`}
                            placeholder="Brief description of the opportunity"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Detailed Description
                        </label>
                        <textarea
                            value={formData.longDescription}
                            onChange={(e) => handleInputChange('longDescription', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Provide more detailed information about the opportunity, responsibilities, and impact"
                        />
                    </div>
                </div>

                {/* Location & Timing */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Location & Timing</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location *
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="City, State or specific address"
                                />
                            </div>
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Duration *
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.duration ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="e.g., 2 hours per week"
                                />
                            </div>
                            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Requirements</h3>
                    <div className="space-y-3">
                        {formData.requirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={req}
                                    onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Reliable transportation"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayField('requirements', index)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    disabled={formData.requirements.length === 1}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayField('requirements')}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add requirement
                        </button>
                    </div>
                    {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Benefits</h3>
                    <div className="space-y-3">
                        {formData.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Make a difference in your community"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayField('benefits', index)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    disabled={formData.benefits.length === 1}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayField('benefits')}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add benefit
                        </button>
                    </div>
                    {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits}</p>}
                </div>

                {/* Skills */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Skills Needed</h3>
                    <div className="space-y-3">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleArrayFieldChange('skills', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Communication, Organization"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayField('skills', index)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    disabled={formData.skills.length === 1}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayField('skills')}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add skill
                        </button>
                    </div>
                    {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Maximum Volunteers
                            </label>
                            <div className="relative">
                                <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="number"
                                    value={formData.maxVolunteers}
                                    onChange={(e) => handleInputChange('maxVolunteers', e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Leave blank for unlimited"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organization *
                            </label>
                            <select
                                value={formData.organizationId}
                                onChange={(e) => handleInputChange('organizationId', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.organizationId ? 'border-red-300' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select your organization</option>
                                {organizations.map((org) => (
                                    <option key={org.id} value={org.id}>{org.name}</option>
                                ))}
                            </select>
                            {errors.organizationId && <p className="text-red-500 text-sm mt-1">{errors.organizationId}</p>}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        {isEditing ? 'Update Opportunity' : 'Post Opportunity'}
                    </button>
                </div>
            </form>
        </div>
    );
}
