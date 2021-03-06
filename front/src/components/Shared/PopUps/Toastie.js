import { Toast } from 'react-bootstrap'

const Toastie = ({ show, toastText, toastTitle, handleToast, toastType }) => {
    return (
        <Toast className="toastie" show={show} onClose={() => handleToast(false)} delay={3000} autohide style={{ position: 'fixed', top: 70, right: 10, width: 450, zIndex: '99999' }}>
            <Toast.Header style={toastType === 'alert' ? { color: 'red', fontWeight: '500'} : { color: 'green', fontWeight: '500'}}>
                <strong className="mr-auto">{toastTitle}</strong>
            </Toast.Header>
            <Toast.Body style={toastType === 'alert' ? { color: 'red', fontWeight: '500'} : { color: 'green', fontWeight: '500'}}>{toastText}</Toast.Body>
        </Toast>
    )
}

export default Toastie