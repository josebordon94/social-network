import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'

export default function OptionsModal() {
  const [show, setShow] = useState(false)

  function handleShow() {
    setShow(true)
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => handleShow()}
      >
        <MdMoreHoriz />
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        style={{ marginTop: '9rem' }}
      >
        <ul className="list-group text-center">
          <li className="list-group-item text-danger fw-bold">Reportar</li>
          <li className="list-group-item text-danger fw-bold">
            Dejar de seguir
          </li>
          <li className="list-group-item">Ir a la publicación</li>
          <li className="list-group-item">Copiar enlace</li>
          <li className="list-group-item">Cancelar</li>
        </ul>
      </Modal>
    </>
  )
}
