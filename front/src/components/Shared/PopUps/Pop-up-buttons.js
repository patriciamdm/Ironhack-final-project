import { Modal } from 'react-bootstrap'

const PopUpButtons = ({ show, hide, title, children }) => {

    return (
        <Modal show={show} onHide={hide} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
                {children}
        </Modal>
    )
}

export default PopUpButtons