import axios from 'axios'
import { useEffect, useState } from 'react'

const Gallery = () => {
  const [gallery, setGallery] = useState()

  const fetchGallery = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/gallery')
      setGallery(response.data)
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    }
  }
  useEffect(() => {
    fetchGallery()
  }, [])

  return (
    <div>
      <h1 className='my-14 text-4xl text-center'>Gallery</h1>
      <div className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {gallery &&
          gallery.map(image => (
            <img
              src={`http://localhost:4000${image.imageUrl}`}
              alt={image.name}
              key={image._id}
              className='w-full aspect-square object-cover mb-2 rounded'
            />
          ))}
      </div>
    </div>
  )
}

export default Gallery
