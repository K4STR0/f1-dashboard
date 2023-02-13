import { useState } from 'react'
import { Navbar, Sidebar } from '../components/ui'

/**
 * Layout with Sidebar and Navbar
 * @property {List of components} children
 */

export const MainView = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)

  return (
    <>
      <Navbar openSidebar={() => setSidebar(true)} />
      <Sidebar className='md:hidden' open={sidebar} closeSidebar={() => setSidebar(false)} />
      {children}
      <div className='fixed bottom-2 right-5 opacity-80'>1.1.0 PUBLIC ALPHA</div>
    </>
  )
}
