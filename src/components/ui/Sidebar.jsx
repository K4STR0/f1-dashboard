import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

export const Sidebar = ({ closeSidebar, open }) => {
  const navigate = useNavigate()
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeSidebar()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div ref={ref} className={`sidebar ${open && 'open'} z-10`}>
      <img
        onClick={closeSidebar}
        src='/icons/close-icon.png'
        className='w-4 h-4 cursor-pointer mt-3 '
      />
      <hr className='border-white w-full' />
      <div
        className='cursor-pointer '
        onClick={() => navigate('/')}
      >
        HOME
      </div>
      <div
        className='cursor-pointer '
        onClick={() => navigate('/standings/drivers')}
      >
        STANDINGS
      </div>
      <div
        className='cursor-pointer'
        onClick={() => navigate('/progress/drivers')}
      >
        PROGRESS
      </div>
      <div className='cursor-pointer' onClick={() => navigate('/records')}>
        RECORDS
      </div>
      <div className='cursor-pointer'>
        OTHERS
      </div>
      <hr className='border-white w-full' />
    </div>
  )
}
