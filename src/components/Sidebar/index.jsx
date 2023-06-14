import React from 'react'
import { Container, Content } from './styles'
import { FaTimes, FaHome, FaChartBar } from 'react-icons/fa'

import { FiLogOut } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active }) => {
  const flougout = () => {
    localStorage.removeItem('result')
    window.location.href = '/'
  }

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <Link to="/Dashboard">
          <SidebarItem Icon={FaHome} Text="Dashboard" />
        </Link>

        <Link to="/upcomingrides">
          <SidebarItem Icon={FaChartBar} Text="Upcoming Rides" />
        </Link>

        <Link to onClick={flougout}>
          <SidebarItem Icon={FiLogOut} Text="Logout" />
        </Link>
      </Content>
    </Container>
  )
}

export default Sidebar
