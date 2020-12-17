import { Modal } from 'react-bootstrap'

const PopUp = ({ show, hide, title, children, size }) => {

    return (
        <Modal centered show={show} onHide={hide} size={size} style={{ zIndex: '99997' }}>
            <Modal.Header closeButton>
                <Modal.Title style={{textTransform: 'capitalize'}}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}

export default PopUp