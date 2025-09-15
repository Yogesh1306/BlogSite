import { useState, useEffect, useRef } from 'react';
import { Search, Close, TrendingUp, History } from '@mui/icons-material';
import { NavLink } from 'react-router';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Mock search function (replace with actual API call)
  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          { id: 1, title: 'Getting Started with React Hooks', type: 'post', excerpt: 'Learn the basics of React hooks...' },
          { id: 2, title: 'Node.js Best Practices', type: 'post', excerpt: 'Essential tips for Node.js development...' },
          { id: 3, title: 'CSS Grid Tutorial', type: 'post', excerpt: 'Master CSS Grid layout...' },
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(mockResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && query.trim()) {
      handleSearch(query);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const popularSearches = ['React', 'Node.js', 'JavaScript', 'CSS', 'TypeScript'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-2xl shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-gray-400" />
              <h3 className="font-secondary text-lg font-semibold text-gray-900">Search Posts</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Close className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for posts, topics, or keywords..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                >
                  <Close className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="px-6 pb-6 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-secondary font-semibold text-gray-900 mb-3">Search Results</h4>
                {results.map((result) => (
                  <NavLink
                    key={result.id}
                    to={`/post/${result.id}`}
                    onClick={() => handleSearch(query)}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <h5 className="font-secondary font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                      {result.title}
                    </h5>
                    <p className="font-primary text-sm text-gray-600 line-clamp-2">
                      {result.excerpt}
                    </p>
                  </NavLink>
                ))}
              </div>
            ) : query.length > 2 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <h4 className="font-secondary text-lg font-semibold text-gray-900 mb-2">No results found</h4>
                <p className="font-primary text-gray-600">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <History className="w-4 h-4 text-gray-400" />
                        <h4 className="font-secondary font-medium text-gray-900">Recent Searches</h4>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <h4 className="font-secondary font-medium text-gray-900">Popular Searches</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => setQuery(search)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors duration-200"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
