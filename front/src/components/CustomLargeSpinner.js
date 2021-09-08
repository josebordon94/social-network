import React from 'react'
import { Spinner } from 'react-bootstrap'

const style = {
  marginTop: '25%',
}

function CustomLargeSpinner() {
  return (
    <div className="d-flex justify-content-center" style={style}>
      <Spinner
        animation="grow"
        className="mx-2"
        style={{ width: '4rem', height: '4rem' }}
      />
      <Spinner
        animation="grow"
        className="mx-2"
        style={{ width: '4rem', height: '4rem' }}
      />
      <Spinner
        animation="grow"
        className="mx-2"
        style={{ width: '4rem', height: '4rem' }}
      />
    </div>
  )
}

export default CustomLargeSpinner
