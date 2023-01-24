import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home, Progress, Standings } from '../pages'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="progress/:champ" element={<Progress />} />
        <Route path="standings/:champ" element={<Standings />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
