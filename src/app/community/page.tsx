'use client';

import { useState } from 'react';
import { Heart, MessageCircle, ThumbsUp, Share2, MoreHorizontal, MapPin, Building2, User, Send, Image as ImageIcon, Link as LinkIcon, Calendar, Users, Share, BookOpen } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar?: string;
  organization: string;
  organizationTag: string;
  isVerified: boolean;
}

interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  link?: string;
  type: 'discussion' | 'opportunity' | 'help-request' | 'achievement' | 'general';
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        organization: 'Community Care Services',
        organizationTag: 'CCS',
        isVerified: true
      },
      content: 'Just finished organizing our monthly food drive! We collected over 500 pounds of food for local families. Huge thanks to all our amazing volunteers who made this possible. The community support was incredible! 🥫❤️',
      type: 'achievement',
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: '2 hours ago',
      isLiked: false,
      tags: ['Food Drive', 'Community Support', 'Volunteer Success']
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Michael Chen',
        avatar: '/api/placeholder/40/40',
        organization: 'Green Thumbs Collective',
        organizationTag: 'GTC',
        isVerified: true
      },
      content: 'Looking for volunteers to help with our urban garden project this weekend! We\'ll be planting native flowers and setting up irrigation systems. Perfect for anyone interested in sustainability and gardening. Tools provided! 🌱🌿',
      type: 'opportunity',
      likes: 18,
      comments: 12,
      shares: 5,
      timestamp: '4 hours ago',
      isLiked: true,
      tags: ['Urban Gardening', 'Sustainability', 'Weekend Project']
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Lisa Rodriguez',
        avatar: '/api/placeholder/40/40',
        organization: 'Paws & Hearts Shelter',
        organizationTag: 'PHS',
        isVerified: true
      },
      content: 'URGENT: We need volunteers to help with a large rescue operation this evening. 15 dogs were found abandoned and need immediate care. Can anyone help with feeding, cleaning, or just spending time with them? Any help appreciated! 🐕💔',
      type: 'help-request',
      likes: 45,
      comments: 23,
      shares: 18,
      timestamp: '6 hours ago',
      isLiked: false,
      tags: ['Animal Rescue', 'Urgent', 'Dog Care']
    },
    {
      id: '4',
      user: {
        id: '4',
        name: 'David Thompson',
        avatar: '/api/placeholder/40/40',
        organization: 'Literacy First Initiative',
        organizationTag: 'LFI',
        isVerified: true
      },
      content: 'What are your thoughts on incorporating digital literacy into our adult education programs? We\'re seeing more seniors interested in learning basic computer skills. Would love to hear from other organizations about their experiences! 💻📚',
      type: 'discussion',
      likes: 12,
      comments: 15,
      shares: 2,
      timestamp: '1 day ago',
      isLiked: false,
      tags: ['Digital Literacy', 'Adult Education', 'Senior Programs']
    },
    {
      id: '5',
      user: {
        id: '5',
        name: 'Emma Wilson',
        avatar: '/api/placeholder/40/40',
        organization: 'HealthBridge Community Clinic',
        organizationTag: 'HBC',
        isVerified: true
      },
      content: 'Our mobile health clinic is expanding to serve more rural areas! We\'re looking for volunteer drivers and medical professionals who can commit to one weekend per month. This is a great opportunity to make healthcare accessible to underserved communities. 🚑🏥',
      type: 'opportunity',
      likes: 31,
      comments: 9,
      shares: 7,
      timestamp: '1 day ago',
      isLiked: false,
      tags: ['Mobile Clinic', 'Rural Health', 'Medical Volunteers']
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPostType, setSelectedPostType] = useState<Post['type']>('general');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const availableTags = [
    'Volunteer Opportunity', 'Help Request', 'Success Story', 'Discussion',
    'Animal Welfare', 'Education', 'Healthcare', 'Environment', 'Community',
    'Senior Care', 'Youth Programs', 'Food Security', 'Housing', 'Transportation'
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        name: 'Current User',
        avatar: '/api/placeholder/40/40',
        organization: 'Your Organization',
        organizationTag: 'YO',
        isVerified: false
      },
      content: newPostContent,
      type: selectedPostType,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Just now',
      isLiked: false,
      tags: selectedTags
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setSelectedTags([]);
    setSelectedPostType('general');
    setShowCreatePost(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getPostTypeIcon = (type: Post['type']) => {
    switch (type) {
      case 'opportunity':
        return <Heart className="h-4 w-4 text-green-600" />;
      case 'help-request':
        return <MessageCircle className="h-4 w-4 text-red-600" />;
      case 'achievement':
        return <ThumbsUp className="h-4 w-4 text-blue-600" />;
      case 'discussion':
        return <MessageCircle className="h-4 w-4 text-purple-600" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPostTypeLabel = (type: Post['type']) => {
    switch (type) {
      case 'opportunity':
        return 'Volunteer Opportunity';
      case 'help-request':
        return 'Help Request';
      case 'achievement':
        return 'Success Story';
      case 'discussion':
        return 'Discussion';
      default:
        return 'General';
    }
  };

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-primary">Community</h1>
          </div>
          <p className="text-secondary text-xl max-w-2xl mx-auto">
            Connect with fellow volunteers, share experiences, and discover new opportunities.
            This is your space to build meaningful relationships and make a difference together.
          </p>
        </div>

        {/* Post Creation Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share a volunteer opportunity, ask for help, or start a discussion..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Add Event</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Tag People</span>
                  </button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feed */}
        <div className="space-y-6">
          {/* Sample Post 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                  <span className="text-sm text-gray-500">• Literacy First Volunteer</span>
                  <span className="text-sm text-gray-400">2 hours ago</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Just finished my weekly reading session with little Emma! She's made such amazing progress in just 3 months.
                  If you're looking for a rewarding volunteer opportunity, I highly recommend the Reading Buddies program at Literacy First.
                  The kids are wonderful and the staff is incredibly supportive! 📚✨
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>24</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>8</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Post 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">Michael Chen</h3>
                  <span className="text-sm text-gray-500">• Community Garden Coordinator</span>
                  <span className="text-sm text-gray-400">5 hours ago</span>
                </div>
                <p className="text-gray-700 mb-4">
                  🚨 URGENT: We need volunteers this Saturday for our community garden cleanup!
                  We're expecting 50+ people for our harvest festival and the garden needs some TLC.
                  If you can spare 2-3 hours, please message me. We'll provide tools and refreshments! 🌱
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>18</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>12</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Post 3 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">Dr. Emily Rodriguez</h3>
                  <span className="text-sm text-gray-500">• HealthBridge Clinic Director</span>
                  <span className="text-sm text-gray-400">1 day ago</span>
                </div>
                <p className="text-gray-700 mb-4">
                  We're launching a new health education program for seniors next month and need volunteers!
                  This is a great opportunity for anyone interested in healthcare or working with older adults.
                  Training provided, flexible schedules. DM me if you're interested! 🏥💙
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>31</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>15</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary text-lg px-8 py-3">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
