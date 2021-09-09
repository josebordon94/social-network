import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomContainer from '../components/CustomContainer'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Spinner } from 'react-bootstrap'
import ImageUploading from 'react-images-uploading'
import Transition from '../components/Transition'
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined'
import { register as registerService } from '../services/authServices'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { useHistory } from 'react-router'

export default function Register() {
  const history = useHistory()
  const [images, setImages] = React.useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = React.useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList)
    setError('')
  }

  const onSubmit = async (data) => {
    if (images.length === 0) {
      setError('¡You must pick a profile picture!')
    } else {
      await registerService(data, images[0])
      history.push('/login')
    }
  }

  return (
    <CustomContainer>
      <h3 className="text-center mt-4">Create your Social Network account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group px-2 mt-2">
          <label>Username</label>
          <input
            {...register('username', { required: true })}
            className="form-control"
          />
          {errors.username && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="form-group px-2 mt-2">
          <label>Password</label>
          <input
            {...register('password', { required: true })}
            className="form-control"
            type="password"
          />
          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="form-group px-2 mt-2">
          <label>Name</label>
          <input
            {...register('name', { required: true })}
            className="form-control"
          />
          {errors.name && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="form-group px-2 mt-2">
          <label>Lastname</label>
          <input
            {...register('lastname', { required: true })}
            className="form-control"
          />
          {errors.lastname && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
        >
          {({ imageList, onImageUpload, isDragging, dragProps }) => (
            <div className="upload__image-wrapper text-center ">
              <button
                className="btn btn-info mt-2  text-center"
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                <PermMediaOutlinedIcon /> Select a profile photo
              </button>
              {images.length === 0 && (
                <img
                  src="/user.png"
                  className="mx-auto d-block mt-2 rounded-circle"
                  onClick={onImageUpload}
                  style={{ maxWidth: '150px' }}
                />
              )}
              &nbsp;
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="image-item d-flex justify-content-center"
                >
                  <Transition>
                    <img
                      src={image.data_url}
                      alt=""
                      className="rounded-circle mt-2"
                      style={{
                        maxWidth: '150px',
                        maxHeight: '150px',
                        minHeight: '150px',
                      }}
                    />
                  </Transition>
                  <div className="image-item__btn-wrapper"></div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        {error && <p className="fw-bold text-danger text-center">{error}</p>}
        <div className="form-group px-2 mt-2">
          <label>Describe yourself</label>
          <textarea {...register('description')} className="form-control" />
          {errors.description && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        {/* errors will return when field validation fails  */}

        <div className="px-2 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary btn-block d-flex justify-content-center align-items-center  my-2"
            style={{ width: '150px', height: '35px' }}
          >
            {!loading ? (
              <>
                <PersonAddIcon className="mx-1" /> Register
              </>
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </button>
        </div>
        <p className="fs-5 text-center mt-2">
          Already have an account? Login{' '}
          <Link to="/login">
            here <ExitToAppIcon />
          </Link>
        </p>
        <div className="w-100 d-flex justify-content-center">
          <img src="/logo.png" style={{ width: '200px' }} className="mx-auto" />
        </div>
      </form>
    </CustomContainer>
  )
}
