import React, { useEffect, useState } from 'react'
import { Navbar, Container, NavDropdown, Nav, Image } from 'react-bootstrap'
import { MdInbox, MdHome } from 'react-icons/md'
import { Link, useHistory } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import ImageIcon from '@material-ui/icons/Image'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { getLoggedUserProfile } from '../services/postServices'
import { getImageUrl } from '../services/fileService'

const Navigation = () => {
  const history = useHistory()
  const [profilePhoto, setProfilePhoto] = useState('/avatar.png')
  useEffect(() => {
    async function getData() {
      const userProfile = await getLoggedUserProfile()
      setProfilePhoto(getImageUrl(userProfile.data.user.photo))
    }
    getData()
    // setProfilePhoto('/' + userProfile.user.photo)
  }, [])
  function logout() {
    localStorage.removeItem('token')
    history.push('/login')
  }
  return (
    <Navbar bg="primary" variant="dark" style={{ height: '60px' }} sticky="top">
      <Container>
        <Link to="/main">
          <img
            alt=""
            src="/logo.png"
            width="100%"
            height="100%"
            className="d-inline-block mb-1"
          />
        </Link>
        <Nav className="ms-auto">
          <NavDropdown
            style={{ marginTop: '13px', marginRight: '-8px' }}
            title={
              <Image
                src={profilePhoto}
                roundedCircle
                style={{ height: '28px', width: '28px', objectFit: 'cover' }}
                className="ms-auto"
              />
            }
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to="/new">
              <ImageIcon /> New post
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/profile/me">
              <PersonIcon /> My profile
            </NavDropdown.Item>
            {/* <NavDropdown.Item href="#action4">
              <TurnedInIcon /> Favourites
            </NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>
              <ExitToAppIcon /> Logout
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/main" style={{ fontSize: '2rem' }}>
            <MdHome />
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/inbox" style={{ fontSize: '2rem' }}>
            <MdInbox />
          </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
