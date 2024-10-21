import Banner from '../components/Banner'
import Card from '../components/Card'
import Gallery from '../components/Gallery'
import { checkAdminStatus } from '../components/IsAdmin'
import person from '../assets/person.svg'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='uppercase text-center text-4xl py-4 font-bold'>
          UNITY Cricket TEAM
        </h1>
        {checkAdminStatus() ? (
          <button className='text-xl bg-green-300 px-3 py-1 rounded-sm'>
            Admin
          </button>
        ) : (
          <img
            onClick={() => navigate('/login')}
            src={person}
            className='border border-gray-800 p-1 rounded-full '
          />
        )}
      </div>
      <Banner />
      <Card />
      <Gallery />
    </div>
  )
}

export default Home
