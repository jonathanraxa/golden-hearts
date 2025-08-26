'use client';

import { useState } from 'react';
import { Heart, MessageCircle, ThumbsUp, Share2, MoreHorizontal, MapPin, Building2, User, Send, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

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
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-primary">Community</h1>
          </div>
          <p className="text-secondary text-xl max-w-2xl mx-auto">
            Connect with fellow volunteers, share experiences, and discover new opportunities. 
            This is your space to build meaningful relationships and make a difference together.
          </p>
        </div>

        {/* Create Post Section */}
        <div className="card mb-8">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              </div>
              <div className="flex-1">
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="w-full text-left p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-muted hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-white dark:bg-gray-700"
                >
                  What's on your mind? Share a volunteer opportunity, ask for help, or start a discussion...
                </button>
              </div>
            </div>

            {showCreatePost && (
              <div className="mt-4 space-y-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts, opportunities, or questions..."
                  rows={4}
                  className="input-field"
                />
                
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedPostType}
                    onChange={(e) => setSelectedPostType(e.target.value as Post['type'])}
                    className="input-field w-auto"
                  >
                    <option value="general">General</option>
                    <option value="opportunity">Volunteer Opportunity</option>
                    <option value="help-request">Help Request</option>
                    <option value="achievement">Success Story</option>
                    <option value="discussion">Discussion</option>
                  </select>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-muted hover:text-secondary transition-colors">
                      <ImageIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-muted hover:text-secondary transition-colors">
                      <LinkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-primary mb-2">Add tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="px-4 py-2 text-secondary hover:text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="card hover:shadow-lg transition-shadow duration-300">
              {/* Post Header */}
              <div className="p-6 border-b border-card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      {post.user.avatar ? (
                        <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <User className="h-6 w-6 text-gray-400 dark:text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-primary">{post.user.name}</h3>
                        {post.user.isVerified && (
                          <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <Building2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                          {post.user.organizationTag}
                        </span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          {getPostTypeIcon(post.type)}
                          <span>{getPostTypeLabel(post.type)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-muted hover:text-secondary transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <p className="text-primary leading-relaxed mb-4">{post.content}</p>
                
                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked 
                          ? 'text-blue-600' 
                          : 'text-muted hover:text-blue-600'
                      }`}
                    >
                      <ThumbsUp className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-muted hover:text-blue-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-muted hover:text-green-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
