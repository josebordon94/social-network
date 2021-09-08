import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import OptionsModal from './OptionsModal'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import PublishIcon from '@material-ui/icons/Publish'
import { getImageUrl } from '../services/fileService'
import { comment as commentService } from '../services/postServices'
import { useHistory } from 'react-router'

const Post = (props) => {
  const history = useHistory()
  const { text, likes, file, createdAt, comments, _id } = props.postData
  console.log('CM: ', comments)
  const date = new Date(createdAt)
  const [commentText, setCommentText] = useState('')
  const { username, userPhoto } = props

  async function comment() {
    console.log(commentText)
    const commentData = {
      post: _id,
      text: commentText,
    }
    const result = await commentService(commentData)
    history.go(0)
    console.log('R: ', result)
  }

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
              src={getImageUrl(userPhoto)}
              roundedCircle
              style={{ height: '40px', width: '40px' }}
              className="ms-auto"
            />
            <span style={{ marginLeft: '7px' }}>{username}</span>
          </span>
          <OptionsModal />
        </div>
        <Image src={getImageUrl(file)} fluid />
        <div className="d-flex justify-content-between my-2">
          <div>
            <IconButton aria-label="" style={{ marginTop: '-14px' }}>
              <FavoriteBorderIcon fontSize="large" style={{ fill: 'black' }} />
            </IconButton>
            <IconButton aria-label="" style={{ marginTop: '-14px' }}>
              <CommentIcon fontSize="large" style={{ fill: 'black' }} />
            </IconButton>
          </div>
          <IconButton aria-label="" style={{ marginTop: '-14px' }}>
            <BookmarkBorderIcon fontSize="large" style={{ fill: 'black' }} />
          </IconButton>
        </div>
        <p className="card-text mx-3 fw-bold" style={{ marginTop: '-8px' }}>
          {likes.length > 0 && likes.length + ' likes &nbsp;&nbsp;'}
          <span className="fst-italic text-secondary">
            ({date.toLocaleString()})
          </span>
        </p>
        <p className="card-text mx-3" style={{ marginTop: '-8px' }}>
          {text}
        </p>
        {comments.length > 0 && (
          <p className="mx-3 fw-light fst-italic">{comments.length} comments</p>
        )}
        <ul className="list-group list-group-flush">
          {comments.map((el) => (
            <li className="list-group-item" key={el._id}>
              <span className="fw-bold mr-2">
                {el.user.username} &nbsp;&nbsp;
              </span>
              {el.text}
            </li>
          ))}
        </ul>
        <div
          className="card-footer text-muted"
          style={{ backgroundColor: 'white' }}
        >
          <div className="input-group d-flex justify-content-space align-items-center">
            <TextareaAutosize
              className="flex-fill"
              aria-label="empty textarea"
              placeholder="Type a comment ..."
              style={{ border: 'none' }}
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
            <IconButton aria-label="" onClick={comment}>
              <PublishIcon style={{ fill: 'black' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
