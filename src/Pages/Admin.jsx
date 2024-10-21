import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [banner, setBanner] = useState(null)
  const [playerData, setPlayerData] = useState({
    name: '',
    role: '',
    image: null
  })
  const [galleryImage, setGalleryImage] = useState(null)
  //   const [players, setPlayers] = useState([])
  //   const [gallery, setGallery] = useState([])

  // Handle banner upload
  const handleBannerUpload = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('banner', banner)

    try {
      const response = await axios.post(
        'http://localhost:4000/admin/upload-banner',
        formData
      )
      setBanner(null)
      alert(response.data.message)
    } catch (error) {
      console.error('Banner upload failed', error)
    }
  }

  // Handle player add/edit
  const handlePlayerSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', playerData.name)
    formData.append('role', playerData.role)
    formData.append('image', playerData.image)

    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.post(
        'http://localhost:4000/admin/players',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )
      setPlayerData({ name: '', role: '', image: null })
      alert(response.data.message)
    } catch (error) {
      console.error('Player upload failed', error)
    }
  }

  // Handle gallery upload
  const handleGalleryUpload = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', galleryImage)

    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/gallery',
        formData
      )
      alert(response.data.message)
    } catch (error) {
      console.error('Gallery upload failed', error)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className='p-8 relative'>
      <h1 className='text-3xl font-bold text-center mb-6'>Admin Dashboard</h1>
      <div className='flex justify-end absolute bottom-2 right-4 '>
        <button
          onClick={handleSignOut}
          className='bg-gray-100 py-2 px-3 hover:bg-red-300 rounded-md '
        >
          Sign Out
        </button>
      </div>
      {/* Banner Upload */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Upload Banner</h2>
        <form onSubmit={handleBannerUpload}>
          <input
            type='file'
            onChange={e => setBanner(e.target.files[0])}
            required
          />
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded mt-4'
          >
            Upload Banner
          </button>
        </form>
      </section>

      {/* Player Management */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Manage Players</h2>
        <form onSubmit={handlePlayerSubmit}>
          <input
            type='text'
            placeholder='Player Name'
            value={playerData.name}
            onChange={e =>
              setPlayerData({ ...playerData, name: e.target.value })
            }
            required
            className='mb-4'
          />
          <input
            type='text'
            placeholder='Player Role'
            value={playerData.role}
            onChange={e =>
              setPlayerData({ ...playerData, role: e.target.value })
            }
            required
            className='mb-4'
          />
          <input
            type='file'
            onChange={e =>
              setPlayerData({ ...playerData, image: e.target.files[0] })
            }
            required
          />
          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded mt-4'
          >
            Add Player
          </button>
        </form>
      </section>

      {/* Gallery Management */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Upload Gallery Image</h2>
        <form onSubmit={handleGalleryUpload}>
          <input
            type='file'
            onChange={e => setGalleryImage(e.target.files[0])}
            required
          />
          <button
            type='submit'
            className='bg-purple-500 text-white py-2 px-4 rounded mt-4'
          >
            Upload Image
          </button>
        </form>
      </section>
    </div>
  )
}

export default AdminDashboard
