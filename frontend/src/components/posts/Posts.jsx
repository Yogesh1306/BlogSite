import Post from "../post/Post"
import { useState, useEffect } from 'react';

const Posts = ({posts}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedPosts, setDisplayedPosts] = useState(6);
  
  useEffect(() => {
    if (posts && posts.length > 0) {
      setIsLoading(false);
    }
  }, [posts]);

  const loadMorePosts = () => {
    setDisplayedPosts(prev => prev + 6);
  };

  // Skeleton loader component
  const PostSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="flex space-x-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 6 }, (_, index) => (
              <PostSkeleton key={index} />
            ))
          ) : posts && posts.length > 0 ? (
            posts.slice(0, displayedPosts).map((post, index) => (
              <div 
                key={post._id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Post post={post} />
              </div>
            ))
          ) : ( 
            // Empty state
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="font-secondary text-2xl font-bold text-gray-900 mb-2">No Posts Yet</h3>
              <p className="font-primary text-gray-600 text-center max-w-md mb-6">
                Be the first to share your thoughts and stories with our community.
              </p>
              <button className="btn-primary font-secondary">
                Write Your First Post
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {posts && displayedPosts < posts.length && (
          <div className="text-center mb-8">
            <button
              onClick={loadMorePosts}
              className="btn-outline font-secondary px-8 py-3 hover:scale-105 transition-transform duration-200"
            >
              Load More Posts
              <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Posts Stats */}
        {posts && posts.length > 0 && (
          <div className="text-center text-gray-500 font-primary text-sm">
            Showing {Math.min(displayedPosts, posts.length)} of {posts.length} posts
          </div>
        )}
      </div>
    </div>
  )
}

export default Posts
