/* eslint-disable react/prop-types */
import { useState } from 'react'
import axios from 'axios'

const EditPlayerModal = ({ player, onClose, fetchPlayer }) => {
  const [formData, setFormData] = useState({
    name: player.name || '',
    role: player.role || '',
    image: player.imageUrl || null
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const updateData = new FormData()
    updateData.append('name', formData.name)
    updateData.append('role', formData.role)
    if (formData.image) updateData.append('image', formData.image)

    try {
      const response = await axios.put(
        `http://localhost:4000/admin/players/${player._id}`,
        updateData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      )

      if (response.data) {
        fetchPlayer
        onClose()
      }
    } catch (error) {
      console.error('Error updating player:', error)
    }
  }

  return (
    <div className='absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-bold mb-4'>Edit Player</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block font-semibold mb-1'>
              Player Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full border border-gray-300 rounded p-2'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='role' className='block font-semibold mb-1'>
              Player Role
            </label>
            <input
              type='text'
              name='role'
              value={formData.role}
              onChange={handleInputChange}
              className='w-full border border-gray-300 rounded p-2'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='image' className='block font-semibold mb-1'>
              Update Image
            </label>
            <input
              type='file'
              name='image'
              onChange={handleFileChange}
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPlayerModal
