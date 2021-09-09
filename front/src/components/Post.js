import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import OptionsModal from './OptionsModal'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import PublishIcon from '@material-ui/icons/Publish'
import { getImageUrl } from '../services/fileService'
import {
  comment as commentService,
  checkLike,
  saveLike,
  saveUnlike,
} from '../services/postServices'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { isAuth } from '../services/authServices'

const Post = (props) => {
  const history = useHistory()
  const { text, likes, file, createdAt, _id } = props.postData
  const [comments, setComments] = useState(props.postData.comments)
  const date = new Date(createdAt)
  const [commentText, setCommentText] = useState('')
  const [newComments, setNewComments] = useState([])
  const [liked, setLiked] = useState(false)
  const { username, userPhoto } = props

  async function comment() {
    const commentData = {
      post: _id,
      text: commentText,
    }
    const result = await commentService(commentData)
    const mainUserData = await isAuth()
    setNewComments([
      ...newComments,
      { text: commentText, username: mainUserData.data.user.username },
    ])
    setCommentText('')
  }

  async function handleLike() {
    if (liked) {
      likes.shift()
      await saveUnlike(_id)
    } else {
      likes.push('foo-bar')
      await saveLike(_id)
    }
    setLiked(!liked)
  }

  async function checkLikedInService() {
    const isLiked = await checkLike(_id)
    setLiked(isLiked.data)
  }

  useEffect(() => {
    checkLikedInService()
  }, [])

  return (
    <>
      <div className="card mb-3">
        <div
          className="card-header d-flex justify-content-between"
          style={{ backgroundColor: 'white' }}
        >
          <Link
            to={'/profile/' + username}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <span>
              <Image
                src={getImageUrl(userPhoto)}
                roundedCircle
                style={{ height: '40px', width: '40px', objectFit: 'cover' }}
                className="ms-auto"
              />
              <span style={{ marginLeft: '7px' }}>{username}</span>
            </span>
          </Link>
          <OptionsModal />
        </div>
        <Image src={getImageUrl(file)} fluid />
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex align-items-center">
            <p className="card-text mx-3 fw-bold" style={{ marginTop: '-8px' }}>
              {likes.length > 0 && likes.length + ' like'}
              {likes.length < 2 ? ' ' : 's '}
              <span className="fst-italic text-secondary">
                ({date.toLocaleString()})
              </span>
            </p>
          </div>
          <div>
            <IconButton
              aria-label=""
              style={{ marginTop: '-14px' }}
              onClick={handleLike}
            >
              {liked ? (
                <FavoriteIcon fontSize="large" style={{ fill: 'black' }} />
              ) : (
                <FavoriteBorderIcon
                  fontSize="large"
                  style={{ fill: 'black' }}
                />
              )}
            </IconButton>
          </div>
        </div>
        <p className="card-text mx-3" style={{ marginTop: '-8px' }}>
          {text}
        </p>
        {comments.length > 0 && (
          <p className="mx-3 fw-light fst-italic">
            {comments.length} comment{comments.length === 1 ? null : 's'}
          </p>
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
          {newComments.map((el, index) => (
            <li className="list-group-item" key={index}>
              <span className="fw-bold mr-2">{el.username} &nbsp;&nbsp;</span>
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
              className="flex-fill comment-text-area"
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
