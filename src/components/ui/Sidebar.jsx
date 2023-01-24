import { useEffect, useRef } from 'react'

export const Sidebar = ({ closeSidebar, open }) => {
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
        src="/icons/close-icon.png"
        className="w-4 h-4 cursor-pointer mt-3 "
      />
      <hr className='border-white w-full'/>
      <div>MORE</div>
      <div>FEATURES</div>
      <div>COMING</div>
      <div>SOON</div>
      <hr className='border-white w-full'/>
      <div>SE</div>
      <div>VIENEN</div>
      <div>COSITAS</div>
      <hr className='border-white w-full'/>
    </div>
  )
}
