'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create mailto link with form data
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        const mailtoLink = `mailto:jonathanraxa@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
    };

    const handleEmailClick = () => {
        const subject = encodeURIComponent('Golden Hearts - Contact Inquiry');
        const body = encodeURIComponent('Hello,\n\nI would like to get in touch regarding Golden Hearts.\n\nBest regards,\n[Your Name]');
        window.open(`mailto:jonathanraxa@gmail.com?subject=${subject}&body=${body}`);
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h2>
                        <p className="text-green-600 mb-4">
                            Thank you for reaching out. We'll get back to you as soon as possible.
                        </p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Send Another Message
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions about volunteering or want to get involved? We'd love to hear from you!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                            <p className="text-gray-600 mb-6">
                                Whether you're looking to volunteer, have questions about our platform, or want to partner with us,
                                we're here to help. Reach out through any of the methods below.
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                                    <p className="text-gray-600 mb-2">
                                        Send us an email and we'll respond within 24 hours.
                                    </p>
                                    <button
                                        onClick={handleEmailClick}
                                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                                    >
                                        support@goldenhearts.com
                                    </button>
                                </div>
                            </div>



                            {/* Location */}
                            {/* <div className="flex items-start space-x-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                                    <p className="text-gray-600 mb-2">
                                        Stop by our office for a face-to-face conversation.
                                    </p>
                                    <p className="text-gray-800">
                                        123 Community Way<br />
                                        San Francisco, CA 94102
                                    </p>
                                </div>
                            </div> */}

                            {/* Hours */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <Clock className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                                    <p className="text-gray-600 mb-2">
                                        We're available during these times:
                                    </p>
                                    <div className="text-gray-800 space-y-1">
                                        <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                                        <p><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
                                        <p><span className="font-medium">Sunday:</span> Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="font-semibold text-blue-900 mb-2">Quick Response Guarantee</h3>
                            <p className="text-blue-800 text-sm">
                                We're committed to responding to all inquiries within 24 hours during business days.
                                For urgent matters, please call us directly.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <AlertCircle className="h-5 w-5 text-red-400" />
                                    <p className="text-red-800">{error}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                <Send className="h-4 w-4" />
                                <span>Send Message</span>
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                By submitting this form, you agree to our{' '}
                                <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">How do I start volunteering?</h3>
                            <p className="text-gray-600 text-sm">
                                Browse our opportunities page to find volunteer positions that match your interests and skills.
                                Click "Apply Now" on any opportunity to get started.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Can organizations post opportunities?</h3>
                            <p className="text-gray-600 text-sm">
                                Yes! Organizations can create accounts and post volunteering opportunities.
                                Visit our "Post Opportunity" page to get started.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Is there a cost to use the platform?</h3>
                            <p className="text-gray-600 text-sm">
                                No, Golden Hearts is completely free for both volunteers and organizations.
                                We're committed to making volunteering accessible to everyone.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">How do I report an issue?</h3>
                            <p className="text-gray-600 text-sm">
                                If you encounter any problems, please contact us immediately.
                                We take all reports seriously and will address them promptly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
