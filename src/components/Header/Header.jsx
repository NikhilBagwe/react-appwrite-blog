import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  // Check if user is logged in or not
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  // Navbar links - based on the authStatus value, we will show the links dynamically in navbar
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]

  return (
    <>
      <header className='py-3 shadow bg-gray-500'>
        <Container>
          <nav className='flex'>
            {/* Logo */}
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px'/>
              </Link>
            </div>

            {/* Generate the nav bar */}
            <ul className='flex ml-auto'>
              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button 
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >{item.name}</button>
                  </li>
                ) : null
              )}

              {/* if user is logged in, then show logout btn */}
              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  )
}

export default Header