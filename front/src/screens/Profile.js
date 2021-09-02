import React from 'react'
import { Image } from 'react-bootstrap'
import UserAlbum from '../components/UserAlbum'

const Profile = () => {
  return (
    <>
      <div className="row">
        <div className="col-xs-3 col-sm-3 col-md-4 d-flex justify-content-center align-items-center">
          <Image
            src="/testPhoto.jpg"
            roundedCircle
            style={{ maxWidth: '200px', maxHeight: '200px', width: '80%' }}
            className="text-center"
          />
        </div>
        <div className="col-xs-9 col-sm-9 col-md-8 p-4 d-flex align-items-center justify-content-center">
          <div>
            <h3 className="text-center fw-bold">jperez93</h3>
            <p>
              <strong>45</strong> publicaciones &nbsp;&nbsp;<strong>28</strong>{' '}
              seguidores &nbsp;&nbsp;
              <strong>26</strong> seguidos
            </p>
            <p>
              Me considero una persona inteligente. Me gusta tocar música y los
              gatos.
            </p>
          </div>
        </div>
        <div className="col-12">
          <UserAlbum />
        </div>
      </div>
    </>
  )
}

export default Profile
