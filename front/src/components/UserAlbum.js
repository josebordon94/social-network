import React from 'react'
import { Image } from 'react-bootstrap'
import Post from './Post'

const UserAlbum = () => {
  const testData = [1, 2, 3, 4, 5]
  return (
    // <div className="row">
    //   {testData.map(() => (
    //     <div className="col-sm-6 col-md-4 mb-4">
    //       <Image src="/dog.jpg" fluid />
    //     </div>
    //   ))}
    // </div>
    <Post />
  )
}

export default UserAlbum
