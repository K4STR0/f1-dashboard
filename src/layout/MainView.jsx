import { useState } from 'react'
import { Navbar, Sidebar } from '../components/ui'

export const MainView = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)
  return (
    <>
      <Navbar openSidebar={() => setSidebar(true)} />
      <Sidebar open={sidebar} closeSidebar={() => setSidebar(false)} />
      {children}
    </>
  )
}
