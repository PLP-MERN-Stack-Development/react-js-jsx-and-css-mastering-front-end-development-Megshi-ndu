import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from './ThemeContext';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const ApiIntegration: React.FC = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (pageNum: number, searchTerm: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const limit = 10;
      const start = (pageNum - 1) * limit;
      
      let url = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`;
      
      if (searchTerm) {
        // JSONPlaceholder doesn't support search, so we'll filter client-side
        url = `https://jsonplaceholder.typicode.com/posts`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      let data = await response.json();
      
      // Client-side search filtering
      if (searchTerm) {
        data = data.filter((post: Post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // For search, we show all results at once
        setHasMore(false);
      } else {
        setHasMore(data.length === limit);
      }
      
      if (pageNum === 1) {
        setPosts(data);
      } else {
        setPosts(prev => [...prev, ...data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(1, search);
  }, [search, fetchPosts]);

  const handleLoadMore = () => {
    if (!search) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    setHasMore(true);
  };

  const filteredPosts = search
    ? posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
            API Integration
          </h1>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search posts..."
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Loading State */}
          {loading && page === 1 && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <p className="mt-2">Loading posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={`p-4 rounded-lg mb-6 ${
              theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
            }`}>
              <p>Error: {error}</p>
              <button
                onClick={() => fetchPosts(1, search)}
                className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <h3 className={`font-semibold mb-2 line-clamp-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                } line-clamp-3`}>
                  {post.body}
                </p>
                <div className={`text-xs mt-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Post ID: {post.id} | User ID: {post.userId}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                No posts found
              </p>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !search && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200 font-medium hover:scale-105 active:scale-95"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiIntegration;