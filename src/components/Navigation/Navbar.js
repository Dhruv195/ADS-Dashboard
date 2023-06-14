import './style.css'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'
import Clickout from './Clickout'

const Navbar = () => {
  // let handler = () => {
  //   setSidebar(false)
  //   document.addEventListener('mousedown', handler)
  // }

  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  const handelClose = () => {
    setSidebar(false)
  }

  return (
    <nav className="navbar sticky-top">
      <Clickout onClickOutside={handelClose}>
        <FaBars className="button" onClick={showSiderbar} />
        {sidebar && <Sidebar active={setSidebar} />}
      </Clickout>
    </nav>
  )
}

export default Navbar
