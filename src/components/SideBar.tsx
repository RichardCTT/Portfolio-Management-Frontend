import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className='w-60 bg-gray-100 p-4 space-y-4'>
      <Link
        to='/'
        className='block hover:underline'
      >
        Portfolio
      </Link>
      <Link
        to='/chart'
        className='block hover:underline'
      >
        Chart
      </Link>
    </div>
  )
}
