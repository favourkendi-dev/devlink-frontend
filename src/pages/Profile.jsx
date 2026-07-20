import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '../api/profileApi'

function Profile() {
  // Holds the profile data once we fetch it
  const [bio, setBio] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [skills, setSkills] = useState('')
  const [username, setUsername] = useState('')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // Runs once when the page first loads to fetch the current profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile()
        setUsername(response.data.username)
        setBio(response.data.bio)
        setGithubUrl(response.data.github_url)
        setSkills(response.data.skills)
      } catch (err) {
        setMessage('Failed to load profile.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      await updateProfile({
        bio: bio,
        github_url: githubUrl,
        skills: skills,
      })
      setMessage('Profile updated successfully!')
    } catch (err) {
      setMessage('Failed to update profile.')
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-violet-600 mb-2">My Profile</h1>
        <p className="text-gray-500 mb-6">@{username}</p>

        {message && (
          <p className="text-sm mb-4 text-violet-600">{message}</p>
        )}

        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          rows={3}
        />

        <label className="block text-sm font-medium mb-1">GitHub URL</label>
        <input
          type="text"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <label className="block text-sm font-medium mb-1">Skills</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. Python, React, SQL"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Profile