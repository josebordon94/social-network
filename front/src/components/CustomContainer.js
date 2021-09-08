import React from 'react'
import { Container } from 'react-bootstrap'

function CustomContainer(props) {
  return (
    <Container className="m-0 p-0 m-md-auto pt-3" style={{ maxWidth: '700px' }}>
      {props.children}
    </Container>
  )
}

export default CustomContainer
