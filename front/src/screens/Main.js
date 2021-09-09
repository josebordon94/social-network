import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import Transition from '../components/Transition'
import { getLoggedUserHome } from '../services/postServices'
import CustomLargeSpinner from '../components/CustomLargeSpinner'

const Main = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)

  async function getData() {
    const data = await getLoggedUserHome()
    setPosts(data.data)
    setLoading(false)
  }

  const handleComment = async function () {
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  if (loading) {
    return <CustomLargeSpinner />
  }

  return (
    <>
      <Transition>
        {posts.length === 0 ? (
          <p className="text-center">There are no posts to show.</p>
        ) : null}
        {posts.map((post) => (
          <Post
            postData={post}
            username={post.user.username}
            userPhoto={post.user.photo}
            key={post._id}
            refresh={handleComment}
          />
        ))}
      </Transition>
    </>
  )
}

export default Main
