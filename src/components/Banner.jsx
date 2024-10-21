import axios from 'axios'
import { useEffect, useState } from 'react'
import { checkAdminStatus } from './IsAdmin'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const [banner, setBanner] = useState()
  const navigate = useNavigate()

  const fetchBanner = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/banner')
      setBanner(response.data.imageUrl)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchBanner()
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='relative'>
        {banner && (
          <img
            src={`http://localhost:4000${banner}`}
            alt='Banner Photo'
            className='max-h-[500px]'
          />
        )}
        {checkAdminStatus() === true && (
          <button
            onClick={() => navigate('/admin')}
            className='absolute bg-red-300/50  hover:bg-red-300 px-3 py-1 rounded-sm right-0 bottom-0'
          >
            Change
          </button>
        )}
      </div>
    </div>
  )
}

export default Banner
