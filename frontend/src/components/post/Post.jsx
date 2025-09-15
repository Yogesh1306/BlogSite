import { NavLink } from "react-router";
import { Favorite, BookmarkBorder, Share, AccessTime, PersonOutline } from "@mui/icons-material";
import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const Post = ({post}) => {
  const publicPath = "http://localhost:3000/"
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { showSuccess, showInfo } = useToast();
  
  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (content) => {
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    
    showSuccess(
      newLikeState ? 'Post liked! ❤️' : 'Post unliked',
      newLikeState ? 'Added to your favorites' : 'Removed from favorites'
    );
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    showInfo(
      newBookmarkState ? 'Post bookmarked! 📖' : 'Bookmark removed',
      newBookmarkState ? 'Added to your reading list' : 'Removed from reading list'
    );
  };

  const handleShare = (e) => {
    e.preventDefault();
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.origin + `/post/${post._id}`,
      }).then(() => {
        showSuccess('Post shared! 🚀', 'Thanks for spreading the word');
      }).catch(() => {
        showInfo('Share cancelled', 'You can try again anytime');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/post/${post._id}`)
        .then(() => {
          showSuccess('Link copied! 📋', 'Share it however you like');
        })
        .catch(() => {
          showInfo('Could not copy link', 'Please try again');
        });
    }
  };

  return (
    <div className="group relative w-full max-w-sm mx-auto">
      <div className="card-hover bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300">
        {/* Post Image */}
        <div className="relative overflow-hidden">
          {post.photo ? (
            <div className="relative h-48 w-full">
              <img 
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' 
                src={publicPath + post.photo} 
                alt={post.title}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Action buttons overlay */}
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 ${
                    isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                  }`}
                >
                  <BookmarkBorder className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white border border-white/20 transition-all duration-200"
                >
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-48 w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-400 font-secondary">
                {post.title.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="p-6">
          {/* Categories */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {post.category.map(c => (
              <span 
                key={c._id} 
                className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors duration-200'
              >
                {c.name.charAt(0).toUpperCase() + c.name.slice(1).toLowerCase()}
              </span>
            ))}
          </div>

          {/* Title */}
          <NavLink to={`/post/${post._id}`}>
            <h3 className='font-secondary text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200 leading-tight'>
              {post.title}
            </h3>
          </NavLink>

          {/* Excerpt */}
          <p className='font-primary text-gray-600 text-sm leading-relaxed mb-4 manage-overflow line-clamp-3'>
            {post.content}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <PersonOutline className="w-4 h-4" />
                <span className="font-medium">{post.username || 'Anonymous'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <AccessTime className="w-4 h-4" />
                <span>{calculateReadingTime(post.content)} min read</span>
              </div>
            </div>
            <span className="text-xs">{formatDate(post.createdAt)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isLiked 
                    ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Favorite className="w-4 h-4" />
                <span className="text-sm font-medium">24</span>
              </button>
            </div>
            
            <NavLink 
              to={`/post/${post._id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 group"
            >
              Read More
              <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
