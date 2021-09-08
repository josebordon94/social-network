import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import Transition from '../components/Transition'
import { getLoggedUserHome } from '../services/postServices'
import CustomLargeSpinner from '../components/CustomLargeSpinner'

const Main = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    async function getData() {
      const data = await getLoggedUserHome()
      setPosts(data.data)
      console.log(data.data)
      setLoading(false)
    }
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
          />
        ))}
      </Transition>
    </>
  )
}

export default Main
