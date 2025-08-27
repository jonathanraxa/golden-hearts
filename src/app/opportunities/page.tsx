import Link from 'next/link';
import { Heart, MapPin, Clock, Users, Star, Filter, Search, ArrowRight } from 'lucide-react';

export default function OpportunitiesPage() {
  const opportunities = [
    {
      id: 1,
      title: "Meals on Wheels Delivery",
      organization: "Community Care Services",
      location: "Downtown Area",
      duration: "2-3 hours/week",
      category: "Food & Nutrition",
      rating: 4.8,
      volunteers: 12,
      description: "Deliver nutritious meals to homebound seniors in your community. Flexible scheduling available.",
      skills: ["Driving", "Compassion", "Reliability"],
      image: "/api/placeholder/400/250"
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
      description: "Help children develop reading skills by reading stories and assisting with literacy programs.",
      skills: ["Reading", "Patience", "Communication"],
      image: "/api/placeholder/400/250"
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
      description: "Maintain community gardens, plant vegetables, and help with garden education programs.",
      skills: ["Gardening", "Physical Activity", "Teaching"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Senior Center Activities",
      organization: "Golden Years Center",
      location: "Senior Center",
      duration: "2-4 hours/week",
      category: "Social Services",
      rating: 4.6,
      volunteers: 20,
      description: "Lead activities, games, and social events for seniors at the community center.",
      skills: ["Leadership", "Creativity", "Social Skills"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Animal Shelter Support",
      organization: "Paws & Hearts Shelter",
      location: "Animal Shelter",
      duration: "2-3 hours/week",
      category: "Animal Welfare",
      rating: 4.9,
      volunteers: 10,
      description: "Help care for animals, assist with adoptions, and support shelter operations.",
      skills: ["Animal Care", "Compassion", "Physical Activity"],
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Hospital Volunteer",
      organization: "Community Hospital",
      location: "Downtown Hospital",
      duration: "4-6 hours/week",
      category: "Healthcare",
      rating: 4.8,
      volunteers: 25,
      description: "Provide support to patients and staff, assist with administrative tasks and patient comfort.",
      skills: ["Compassion", "Organization", "Communication"],
      image: "/api/placeholder/400/250"
    }
  ];

  const categories = [
    "All Categories",
    "Food & Nutrition",
    "Education",
    "Environment",
    "Social Services",
    "Animal Welfare",
    "Healthcare",
    "Community Development"
  ];

  const locations = [
    "All Locations",
    "Downtown Area",
    "Central Library",
    "Community Garden",
    "Senior Center",
    "Animal Shelter",
    "Downtown Hospital"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Volunteering Opportunity
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover meaningful ways to contribute to your community. Filter by location,
            category, and time commitment to find the perfect match for your skills and interests.
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
                  placeholder="Search opportunities..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group flex flex-col h-full">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>

              <div className="mb-4 px-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  {opportunity.category}
                </span>
                <Link
                  href={`/opportunities/${opportunity.id}`}
                  className="block hover:text-blue-600 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 group-hover:text-blue-600">
                    {opportunity.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-3">{opportunity.organization}</p>
                <p className="text-gray-600 text-sm mb-4">{opportunity.description}</p>
              </div>

              <div className="space-y-2 mb-4 px-4">
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

              {/* Skills */}
              <div className="mb-4 px-4">
                <p className="text-sm text-gray-600 mb-2">Skills needed:</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <span key={skill} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom section - always at bottom */}
              <div className="mt-auto flex items-center justify-between px-4 py-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{opportunity.rating}</span>
                </div>
                <button className="btn-primary">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary text-lg px-8 py-3">
            Load More Opportunities
          </button>
        </div>
      </div>
    </div>
  );
}
