import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home, Progress, Records, Standings } from '../pages'

/**
 * Main route component for the app
 * @route /records -> Records Page
 * @route /progress/:champ -> Progress Page
 * :champ (select between "drivers" or "constructors" championship)
 * @route /standings/:champ -> Standings Page
 * :champ (select between "drivers" or "constructors" championship)
 * @route /* -> Home Page
 */

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='records' element={<Records />} />
        <Route path='progress/:champ' element={<Progress />} />
        <Route path='standings/:champ' element={<Standings />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
