import React from 'react'
import { Navbar, Container, NavDropdown, Nav, Image } from 'react-bootstrap'
import { MdInbox, MdHome } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" style={{ height: '60px' }} sticky="top">
      <Container>
        <Link to="/">
          <Navbar.Brand href="#home">Social network</Navbar.Brand>
        </Link>
        <Nav className="ms-auto">
          <NavDropdown
            style={{ marginTop: '13px', marginRight: '-8px' }}
            title={
              <Image
                src="/avatar.png"
                roundedCircle
                style={{ maxHeight: '28px', maxWidth: '28px' }}
                className="ms-auto"
              />
            }
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item>
              <Link to="/profile/1">Mi perfil</Link>
            </NavDropdown.Item>

            <NavDropdown.Item href="#action4">Guardados</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
          <Link to="/">
            <Nav.Link href="#link" style={{ fontSize: '2rem' }}>
              <MdHome />
            </Nav.Link>
          </Link>
          <Link to="/inbox">
            <Nav.Link href="#link" style={{ fontSize: '2rem' }}>
              <MdInbox />
            </Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
