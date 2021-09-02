import React from 'react'
import { Image } from 'react-bootstrap'
import OptionsModal from './OptionsModal'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import PublishIcon from '@material-ui/icons/Publish'
const Post = () => {
  const styles = {}
  return (
    <>
      <div className="card mb-3">
        <div
          className="card-header d-flex justify-content-between"
          style={{ backgroundColor: 'white' }}
        >
          <span>
            {' '}
            <Image
              src="/avatar.png"
              roundedCircle
              style={{ maxHeight: '40px', maxWidth: '40px' }}
              className="ms-auto"
            />
            <span style={{ marginLeft: '7px' }}>Juan Pérez</span>
          </span>
          <OptionsModal />
        </div>
        <Image src="/testPhoto.jpg" fluid />
        <div className="d-flex justify-content-between my-2">
          <div>
            <IconButton
              aria-label=""
              // size="large"
              style={{ marginTop: '-14px' }}
            >
              <FavoriteBorderIcon fontSize="large" style={{ fill: 'black' }} />
            </IconButton>
            <IconButton
              aria-label=""
              // size="large"
              style={{ marginTop: '-14px' }}
            >
              <CommentIcon fontSize="large" style={{ fill: 'black' }} />
            </IconButton>
          </div>
          <IconButton aria-label="" style={{ marginTop: '-14px' }}>
            <BookmarkBorderIcon fontSize="large" style={{ fill: 'black' }} />
          </IconButton>
        </div>
        <p className="card-text mx-3 fw-bold" style={{ marginTop: '-8px' }}>
          155 likes{' '}
          <span className="fst-italic text-secondary">
            &nbsp;&nbsp;(3 minutes ago)
          </span>
        </p>
        <p className="card-text mx-3" style={{ marginTop: '-8px' }}>
          Ejemplo de texto. Acá iría una fabulosa frase motivadora de Paulo
          Coelho. No te rindas ante las adversidades.
        </p>
        <p className="mx-3 fw-light fst-italic">Ver los 25 comentarios</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="fw-bold mr-2">randomPerson41 &nbsp;&nbsp;</span>
            WOW! Alta fotito bro no me la conteiner
          </li>
          <li className="list-group-item">
            <span className="fw-bold mr-2">
              unaChicaCualquiera85 &nbsp;&nbsp;
            </span>
            &#128151;&#128151;
          </li>
        </ul>
        <div
          className="card-footer text-muted"
          style={{ backgroundColor: 'white' }}
        >
          <div className="input-group d-flex justify-content-space align-items-center">
            <TextareaAutosize
              className="flex-fill"
              aria-label="empty textarea"
              placeholder="Escriba un comentario..."
              style={{ border: 'none' }}
            />
            <IconButton aria-label="" size="large">
              <PublishIcon style={{ fill: 'black' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
