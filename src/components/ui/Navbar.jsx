import { useNavigate } from 'react-router'

export const Navbar = ({ openSidebar }) => {
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <img
        onClick={openSidebar}
        src="/icons/nav-icon.png"
        className="absolute w-5 h-5 cursor-pointer"
      />
      <div className="flex m-auto gap-5 md:gap-20">
        <div>RECORDS</div>
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          HOME
        </div>
        <div className="cursor-pointer" onClick={() => navigate('/progress')}>
          PROGRESS
        </div>
      </div>
    </div>
  )
}
