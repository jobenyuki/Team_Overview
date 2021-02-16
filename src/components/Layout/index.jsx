import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
// Import custom components
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
// Import styles
import './style.scss'

const Layout = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
      <Footer />
    </QueryClientProvider>
  )
}

export default Layout
