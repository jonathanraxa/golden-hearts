import Link from 'next/link';
import { Heart, Users, MapPin, Clock, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="h-16 w-16 text-red-400" />
            <h1 className="text-5xl md:text-6xl font-bold">Golden Hearts</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Connect with volunteering opportunities and build meaningful relationships in your community.
            A platform designed for everyone who wants to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/opportunities" className="btn-primary text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
              Find Opportunities
            </Link>
            <Link href="/register" className="btn-primary text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">2,500+</div>
              <div className="text-muted">Active Volunteers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-muted">Organizations</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">5,000+</div>
              <div className="text-muted">Hours Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">25+</div>
              <div className="text-muted">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Featured Opportunities</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Discover meaningful ways to give back to your community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Senior Companion Program",
                organization: "Golden Age Foundation",
                location: "Community Center",
                duration: "2-3 hours/week",
                volunteers: 12,
                rating: 4.8,
                category: "Social Services"
              },
              {
                id: 2,
                title: "Reading Buddies",
                organization: "Literacy First",
                location: "Local Library",
                duration: "1-2 hours/week",
                volunteers: 8,
                rating: 4.9,
                category: "Education"
              },
              {
                id: 3,
                title: "Community Garden Maintenance",
                organization: "Green Thumbs Collective",
                location: "Community Garden",
                duration: "3-4 hours/week",
                volunteers: 15,
                rating: 4.7,
                category: "Environment"
              }
            ].map((opportunity, index) => (
              <Link
                key={index}
                href={`/opportunities/${opportunity.id}`}
                className="card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group flex flex-col h-full"
              >
                <div className="p-4 flex flex-col h-full">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                    {opportunity.category}
                  </span>
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-blue-600 transition-colors">
                    {opportunity.title}
                  </h3>
                  <p className="text-secondary mb-4">{opportunity.organization}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      {opportunity.duration}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      {opportunity.volunteers} volunteers
                    </div>
                  </div>

                  {/* Bottom section - always at bottom */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-muted">{opportunity.rating}</span>
                    </div>
                    <div className="text-blue-600 group-hover:text-blue-700 text-sm font-medium transition-colors flex items-center space-x-1">
                      <span>View Details</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
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
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Volunteer with Golden Hearts?</h2>
            <p className="text-secondary text-lg max-w-3xl mx-auto">
              Our platform is designed to make volunteering accessible, meaningful, and enjoyable for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Meaningful Impact</h3>
              <p className="text-secondary">
                Connect with causes that matter to you and see the real difference you make in your community
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Build Community</h3>
              <p className="text-secondary">
                Meet like-minded people, form lasting friendships, and become part of a supportive network
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Flexible Commitment</h3>
              <p className="text-secondary">
                Choose opportunities that fit your schedule and interests, from one-time events to ongoing programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of volunteers who are already making an impact in their communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
              Get Started Today
            </Link>
            <Link href="/about" className="btn-secondary text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
