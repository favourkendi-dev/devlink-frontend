import { useState, useEffect } from 'react'
import { getPosts, createPost } from '../api/postsApi'

function Dashboard() {
  const [posts, setPosts] = useState([])
  const [newPostContent, setNewPostContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetches all posts when the page first loads
  const fetchPosts = async () => {
    try {
      const response = await getPosts()
      setPosts(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load posts.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleCreatePost = async (e) => {
    e.preventDefault()
    setError('')

    if (!newPostContent.trim()) {
      return
    }

    try {
      await createPost({ content: newPostContent })
      setNewPostContent('')
      // Refetches the whole list so the new post shows up immediately
      fetchPosts()
    } catch (err) {
      console.error(err)
      setError('Failed to create post.')
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-violet-600 mb-6">Feed</h1>

      {/* Create post form */}
      <form
        onSubmit={handleCreatePost}
        className="bg-white p-4 rounded shadow-sm mb-6"
      >
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Share an update with other developers..."
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          rows={3}
        />
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Post
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {/* The feed itself */}
      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Be the first to share something!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow-sm">
              <p className="font-semibold text-gray-800">@{post.author}</p>
              <p className="text-gray-700 mt-1">{post.content}</p>
              <p className="text-gray-400 text-xs mt-2">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard