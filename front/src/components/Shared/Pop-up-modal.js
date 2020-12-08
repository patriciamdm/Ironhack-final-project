import { Modal } from 'react-bootstrap'

const PopUp = ({ show, hide, title, children }) => {

    return (
        <Modal show={show} onHide={hide} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}

export default PopUp