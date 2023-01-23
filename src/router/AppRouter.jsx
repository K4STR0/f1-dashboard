import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home, Progress } from '../pages'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="progress" element={<Progress />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
