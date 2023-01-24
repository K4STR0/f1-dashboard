import { useState } from 'react'
import { Navbar, Sidebar } from '../components/ui'

export const MainView = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)

  return (
    <>
      <Navbar openSidebar={() => setSidebar(true)} />
      <Sidebar open={sidebar} closeSidebar={() => setSidebar(false)} />
      {children}
      <div className='fixed bottom-2 right-5 opacity-80'>1.0.0 PUBLIC ALPHA</div>
    </>
  )
}
