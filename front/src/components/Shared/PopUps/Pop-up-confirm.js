import { Modal, Button } from 'react-bootstrap'

const PopUpConfirm = ({ show, hide, title, body, leftAction, rightAction, leftText, rightText, type }) => {

    return (
        <Modal show={show} onHide={hide} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={leftAction}>{leftText}</Button>
                <Button className={type === 'danger' ? 'btn-danger' : 'btn-secondary'} onClick={rightAction}>{rightText}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PopUpConfirm