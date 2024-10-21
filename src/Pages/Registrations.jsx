import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:4000/registration',
        formData
      )
      console.log(response.data)
      navigate('/login')
    } catch (err) {
      setError(err.response.data.errors)
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
