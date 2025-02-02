import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'

import { RootLayout } from './layout'
import { HomePage } from './pages/home'
import { AuthPage } from './pages/auth/register'
import { NotFound } from './pages/not-found'

function App() {
  const location = useLocation()

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
