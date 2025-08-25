import Link from 'next/link';
import { Heart, Users, MapPin, Clock, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredOpportunities = [
    {
      id: 1,
      title: "Meals on Wheels Delivery",
      organization: "Community Care Services",
      location: "Downtown Area",
      duration: "2-3 hours/week",
      category: "Food & Nutrition",
      rating: 4.8,
      volunteers: 12,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Library Reading Program",
      organization: "Public Library",
      location: "Central Library",
      duration: "1-2 hours/week",
      category: "Education",
      rating: 4.9,
      volunteers: 8,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Community Garden Maintenance",
      organization: "Green Thumbs Collective",
      location: "Community Garden",
      duration: "3-4 hours/week",
      category: "Environment",
      rating: 4.7,
      volunteers: 15,
      image: "/api/placeholder/300/200"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Active Volunteers" },
    { number: "150+", label: "Organizations" },
    { number: "15,000+", label: "Hours Served" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Make a Difference in Your Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with meaningful volunteering opportunities and build lasting relationships. 
              Perfect for older adults who want to stay active and give back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/opportunities" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Find Opportunities
              </Link>
              <Link href="/about" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
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

      {/* Featured Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover rewarding ways to contribute to your community. These opportunities are 
              perfect for older adults looking to make a meaningful impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-gray-400" />
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                    {opportunity.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{opportunity.organization}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {opportunity.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {opportunity.volunteers} volunteers
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{opportunity.rating}</span>
                  </div>
                  <Link href={`/opportunities/${opportunity.id}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/opportunities" className="btn-primary text-lg px-8 py-3">
              View All Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Volunteer with Golden Hearts?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is specifically designed to help older adults find meaningful ways 
              to contribute while building lasting connections in their community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Meaningful Impact</h3>
              <p className="text-gray-600">
                Make a real difference in your community with opportunities that match your skills and interests.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals and form lasting friendships while serving together.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Active</h3>
              <p className="text-gray-600">
                Keep your mind and body active with engaging activities that bring purpose to your days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of volunteers who are already making an impact in their communities. 
            Start your volunteering journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started
            </Link>
            <Link href="/opportunities" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              Browse Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
