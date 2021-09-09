import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import Transition from '../components/Transition'
import {
  getLoggedUserProfile,
  getGenericUserProfile,
} from '../services/postServices'
import CustomLargeSpinner from '../components/CustomLargeSpinner'
import Post from '../components/Post'
import { getImageUrl } from '../services/fileService'
import { useParams } from 'react-router-dom'

const MyProfile = (props) => {
  const { id } = useParams() //Get the user ID if is a not-logged-in user profile
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({ username: '' })
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    async function getData() {
      let data
      if (id) {
        //Show profile of url params user ID
        data = await getGenericUserProfile(id)
      } else {
        //Show logged in user profile
        data = await getLoggedUserProfile()
      }
      setUser(data.data.user)
      setPosts(data.data.posts)
      setLoading(false)
    }
    getData()
  }, [id])

  if (loading) {
    return <CustomLargeSpinner />
  }
  return (
    <>
      <Transition>
        <div className="row">
          <div className="col-xs-4 col-sm-3 col-md-4 d-flex justify-content-center align-items-center">
            <Image
              src={getImageUrl(user.photo)}
              roundedCircle
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                width: '8rem',
                height: '8rem',
                boxShadow: '2px 2px 2px 2px #444444',
                objectFit: 'cover',
              }}
              className="text-center"
            />
          </div>
          <div className="col-xs-8 col-sm-9 col-md-8 p-4 d-flex align-items-center justify-content-center">
            <div>
              <h3 className="text-center fw-bold">{user.username}</h3>
              <p className="text-center">
                <strong>{posts.length}</strong>{' '}
                {posts.length > 1 ? 'posts' : 'post'}&nbsp;&nbsp;
                {/* <strong>{user.following.length}</strong> followers &nbsp;&nbsp;
                <strong>3</strong> following */}
              </p>
              <p className="text-center text-primary">{user.description}</p>
            </div>
          </div>
          <div className="col-12 mt-3">
            {posts.length === 0 ? (
              <p className="text-center">There are no posts yet.</p>
            ) : null}
            {posts.map((post) => (
              <Post
                postData={post}
                username={user.username}
                key={post._id}
                userPhoto={user.photo}
              />
            ))}
          </div>
        </div>
      </Transition>
    </>
  )
}

export default MyProfile
