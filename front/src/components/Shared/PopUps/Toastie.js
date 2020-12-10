import { Toast } from 'react-bootstrap'

const Toastie = ({ show, toastText, toastTitle, handleToast, toastType }) => {
    return (
        <Toast show={show} onClose={() => handleToast(false)} delay={3000} autohide style={{ position: 'fixed', top: 70, right: 10, width: 500 }}>
            <Toast.Header style={toastType === 'alert' ? { color: 'red', fontWeight: '500'} : { color: 'green', fontWeight: '500'}}>
                {/* <img src={logo} className="rounded mr-2" alt="" style={{ width: 20, height: 20 }} /> */}
                <strong className="mr-auto">{toastTitle}</strong>
            </Toast.Header>
            <Toast.Body style={toastType === 'alert' ? { color: 'red', fontWeight: '500'} : { color: 'green', fontWeight: '500'}}>{toastText}</Toast.Body>
        </Toast>
    )
}

export default Toastie