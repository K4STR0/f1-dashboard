import { useNavigate } from 'react-router'

/**
 * Navigation bar of the page (top bar, content only visible on big screens)
 * On small screens it's only visible the button to open and close sidebar
 * @property {function} openSidebar function to open the sidebar
 * Sidebar is only visible on small screens
 */

export const Navbar = ({ openSidebar }) => {
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      {/* Icon to open sidebar */}
      <img
        onClick={openSidebar}
        src='/icons/nav-icon.png'
        className='absolute w-5 h-5 cursor-pointer md:hidden'
      />
      {/* List of sections of the page */}
      <div className='md:grid md:grid-cols-5 m-auto gap-20 items-center'>
        <div
          className='cursor-pointer max-md:hidden'
          onClick={() => navigate('/standings/drivers')}
        >
          STANDINGS
        </div>
        <div
          className='cursor-pointer max-md:hidden'
          onClick={() => navigate('/progress/drivers')}
        >
          PROGRESS
        </div>
        <div
          className='flex justify-center cursor-pointer'
          onClick={() => navigate('/')}
        >
          {/* Page logo */}
          <img
            className='w-10 m-auto opacity-70'
            src='/icons/f1dashboard.svg'
            alt=''
          />
        </div>
        <div
          className='cursor-pointer max-md:hidden'
          onClick={() => navigate('/records')}
        >
          RECORDS
        </div>
        <div
          className='cursor-pointer max-md:hidden'
          onClick={() => navigate('/records')}
        >
          OTHERS
        </div>
      </div>
    </div>
  )
}
