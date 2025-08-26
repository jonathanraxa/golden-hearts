import { Heart, Users, Shield, Star, Globe, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: "Compassion",
            description: "We believe in the power of empathy and understanding to create meaningful connections between volunteers and communities."
        },
        {
            icon: Users,
            title: "Community",
            description: "Building strong, supportive networks where everyone feels valued and connected to their neighbors."
        },
        {
            icon: Shield,
            title: "Trust",
            description: "Creating a safe, reliable platform where volunteers and organizations can confidently connect and collaborate."
        },
        {
            icon: Star,
            title: "Excellence",
            description: "Striving for the highest quality in everything we do, from user experience to community impact."
        },
        {
            icon: Globe,
            title: "Inclusivity",
            description: "Welcoming people of all backgrounds, abilities, and experience levels to contribute to their communities."
        },
        {
            icon: Award,
            title: "Recognition",
            description: "Celebrating the contributions of volunteers and the positive impact they make in their communities."
        }
    ];

    const stats = [
        { number: "2,500+", label: "Active Volunteers" },
        { number: "150+", label: "Partner Organizations" },
        { number: "15,000+", label: "Hours Served" },
        { number: "95%", label: "Volunteer Satisfaction" }
    ];

    const team = [
        {
            name: "Zach Fetter",
            role: "Founder & CEO",
            bio: "Former social worker with 20+ years experience in community development and senior services.",
            image: "/zach.jpeg"
        },
        {
            name: "Jonathan Raxa",
            role: "Head of Technology",
            bio: "Tech leader passionate about creating accessible digital solutions for all volunteers.",
            image: "/jon.jpeg"
        },
        {
            name: "David Raxa",
            role: "Director of Product & Design",
            bio: "Product and design lead with a passion for creating intuitive and user-friendly digital experiences.",
            image: "/david.jpeg"
        },
        {
            name: "Dr. Maria Rodriguez",
            role: "Community Director",
            bio: "Community psychologist specializing in social connection and volunteer engagement research.",
            image: "/api/placeholder/150/150"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            About Golden Hearts
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            We're on a mission to connect people of all ages with meaningful volunteering opportunities,
                            building stronger communities one heart at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Our Mission
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Golden Hearts was founded with a simple yet powerful vision: to create a world where
                            everyone has the opportunity to make a meaningful difference in their community
                            while building lasting connections and staying active and engaged.
                        </p>
                        <p className="text-xl text-gray-600 leading-relaxed mt-6">
                            While our platform is particularly well-designed for older adults and retirees, we welcome
                            volunteers of all ages who want to contribute their time, skills, and passion to causes they care about.
                            We believe that every person, regardless of age, has unique gifts to share with their community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 text-lg">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These core values guide everything we do and shape the community we're building.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                        Our Story
                    </h2>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-6">
                            Golden Hearts was born from a personal experience. Our founder, Zach Fetter,
                            watched his grandmother struggle to find meaningful ways to stay engaged after retirement.
                            Despite having decades of valuable experience and a desire to help others, she found it
                            difficult to discover volunteering opportunities that matched her interests and abilities.
                        </p>

                        <p className="mb-6">
                            This challenge inspired Zach to create a platform that would make it easy for people of all ages
                            to find rewarding opportunities, connect with like-minded individuals,
                            and make a real difference in their communities. While we started with a focus on older adults,
                            we quickly realized that our approach benefits volunteers of every age.
                        </p>

                        <p className="mb-6">
                            What started as a simple idea has grown into a thriving community of volunteers,
                            organizations, and community leaders working together to create positive change.
                            Today, Golden Hearts serves thousands of volunteers across the country, helping them
                            find purpose, build connections, and contribute to causes they care about.
                        </p>

                        <p>
                            Our journey is just beginning, and we're excited to continue expanding our reach
                            and impact, welcoming volunteers of all ages to join our mission of building stronger communities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The passionate individuals behind Golden Hearts who are committed to making a difference
                            in communities across the country.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={`${member.name} - ${member.role}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Join Our Mission
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Whether you're looking to volunteer or want to learn more about how we're building
                        stronger communities, we'd love to hear from you. All ages and experience levels welcome!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                            Get Started
                        </Link>
                        <Link href="/contact" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
