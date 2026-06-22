import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div data-theme="dark" className="min-h-screen flex flex-col">
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
