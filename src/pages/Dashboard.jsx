import { useState, useEffect } from 'react'
import { getPosts, createPost, updatePost, deletePost } from '../api/postsApi'
import { useAuth } from '../context/useAuth'

function Dashboard() {
  const [posts, setPosts] = useState([])
  const [newPostContent, setNewPostContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Tracks which post (by id) is currently being edited, if any.
  const [editingPostId, setEditingPostId] = useState(null)
  const [editContent, setEditContent] = useState('')

  const { currentUsername } = useAuth()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      fetchPosts()
    } catch (err) {
      console.error(err)
      setError('Failed to create post.')
    }
  }

  // Puts a specific post into "editing" mode.
  const startEditing = (post) => {
    setEditingPostId(post.id)
    setEditContent(post.content)
  }

  const cancelEditing = () => {
    setEditingPostId(null)
    setEditContent('')
  }

  const handleUpdatePost = async (id) => {
    try {
      await updatePost(id, { content: editContent })
      cancelEditing()
      fetchPosts()
    } catch (err) {
      console.error(err)
      setError('Failed to update post.')
    }
  }

  const handleDeletePost = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?')
    if (!confirmed) return

    try {
      await deletePost(id)
      fetchPosts()
    } catch (err) {
      console.error(err)
      setError('Failed to delete post.')
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-violet-600 mb-6">Feed</h1>

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

      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Be the first to share something!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow-sm">
              <p className="font-semibold text-gray-800">@{post.author}</p>

              {editingPostId === post.id ? (
                // Editing mode for this specific post.
                <div className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                    rows={2}
                  />
                  <button
                    onClick={() => handleUpdatePost(post.id)}
                    className="bg-violet-600 text-white px-3 py-1 rounded text-sm hover:bg-violet-700 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Normal display mode.
                <>
                  <p className="text-gray-700 mt-1">{post.content}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(post.created_at).toLocaleString()}
                  </p>

                  {/* Only show edit/delete if the logged-in user is the author. */}
                  {post.author === currentUsername && (
                    <div className="mt-2">
                      <button
                        onClick={() => startEditing(post)}
                        className="text-violet-600 text-sm hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard