import { useNavigate } from 'react-router'

export const Navbar = ({ openSidebar }) => {
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <img
        onClick={openSidebar}
        src="/icons/nav-icon.png"
        className="absolute w-5 h-5 cursor-pointer md:hidden"
      />
      <div className="flex m-auto gap-20">
        <div
          className="cursor-pointer max-md:hidden"
          onClick={() => navigate('/standings/drivers')}
        >
          STANDINGS
        </div>
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          DASHBOARD
        </div>
        <div
          className="cursor-pointer max-md:hidden"
          onClick={() => navigate('/progress/drivers')}
        >
          PROGRESS
        </div>
        <div
          className="cursor-pointer max-md:hidden"
          onClick={() => navigate('/records')}
        >
          RECORDS
        </div>
      </div>
    </div>
  )
}
