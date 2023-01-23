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
      <div>HI</div>
      <div>IM</div>
      <div>A</div>
      <div>SIDEBAR</div>
    </div>
  )
}
