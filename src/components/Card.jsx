import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import EditPlayerModal from './EditPlayer'

const Card = () => {
  const [showModal, setShowModal] = useState(false)
  const [playerdata, setPlayerdata] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/players')
      if (response.data) {
        setPlayerdata(response.data)
      }
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  const checkAdminStatus = () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      if (decodedToken.role === 'admin') {
        setIsAdmin(true)
      }
    }
  }

  useEffect(() => {
    fetchData()
    checkAdminStatus()
  }, [])

  // Delete player function
  const handleDelete = async id => {
    console.log(id)

    try {
      await axios.delete(`http://localhost:4000/admin/players/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      fetchData()
    } catch (error) {
      console.error('Error deleting player', error)
    }
  }

  return (
    <div>
      <h2 className='my-4 text-2xl font-bold text-center '>Players</h2>
      <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {playerdata &&
          playerdata.map((player, index) => (
            <div
              key={player._id}
              className='bg-gray-200 text-center flex flex-col justify-between p-4 rounded-lg shadow-md'
            >
              {/* This is Player Edit Modal */}
              {showModal && (
                <EditPlayerModal
                  player={player}
                  onClose={() => setShowModal(false)}
                  fetchPlayer={fetchData()}
                />
              )}
              {/* Player Edit Modal Finished */}

              <img
                alt={player.name}
                src={`http://localhost:4000${player.imageUrl}`}
                className='w-full aspect-square object-cover mb-2 rounded'
              />
              <div className='flex justify-start items-center'>
                <p className='text-2xl p-4'>{index + 1}</p>
                <div className='flex-grow my-2'>
                  <h3 className='text-xl font-semibold'>{player.name}</h3>
                  <p>{player.role}</p>
                </div>
              </div>
              {/* Show edit and delete options only if the user is admin */}
              {isAdmin && (
                <div className='flex justify-between mt-4'>
                  <button
                    onClick={() => setShowModal(!showModal)}
                    className='bg-blue-500 text-white text-xs px-2 py-1 rounded'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(player._id)}
                    className='bg-red-500 text-white text-xs px-2 py-1 rounded'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Card
