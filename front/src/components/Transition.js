import React from 'react'
import Fade from '@material-ui/core/Fade'

export default function Transition(props) {
  return (
    <div>
      <Fade in={true} timeout={500}>
        <div>{props.children}</div>
      </Fade>
    </div>
  )
}
