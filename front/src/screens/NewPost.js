import React from 'react'
import PublishIcon from '@material-ui/icons/Publish'
import ImageUploading from 'react-images-uploading'
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined'
import Transition from '../components/Transition'
import { create } from '../services/postServices'
import { useHistory } from 'react-router'

export default function NewPost() {
  const history = useHistory()
  const [images, setImages] = React.useState([])
  const [text, setText] = React.useState('')
  const [error, setError] = React.useState('')
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList)
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (images.length === 0) {
      setError('¡Debe elegir una foto!')
    } else {
      await create(text, images[0])
      history.push('/profile/me')
    }
  }

  function handleTextChange(event) {
    setText(event.target.value)
  }

  return (
    <Transition>
      <form onSubmit={handleSubmit}>
        <div className="form-group text-center fs-5">
          <label htmlFor="exampleFormControlTextarea1">
            Write some description of the photo
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
            value={text}
            onChange={handleTextChange}
          ></textarea>
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
                <PermMediaOutlinedIcon /> Select a photo here
              </button>
              {images.length === 0 && (
                <img
                  src="/examplePhoto.png"
                  className="mx-auto d-block mt-2"
                  onClick={onImageUpload}
                  width="60%"
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
                      width="60%"
                      style={{ marginTop: '0.7rem', marginBottom: '0.7rem' }}
                    />
                  </Transition>
                  <div className="image-item__btn-wrapper"></div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        {error && <p className="fw-bold text-danger text-center">{error}</p>}
        <button type="submit" className="btn btn-success mx-auto d-block  mb-4">
          <PublishIcon style={{ marginBottom: '4px' }} /> Publish on my profile
        </button>
      </form>
    </Transition>
  )
}
