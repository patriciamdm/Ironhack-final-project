import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import BtsCarousel from './Carousel/Carousel-bts'
import Toastie from '../../Shared/PopUps/Toastie'

const Home = ({theUser, toastieInfo, handleToast, showToast}) => {
    return (
        <Container>
            <Row className="justify-content-center">
                <BtsCarousel />
            </Row>
            <Row className="justify-content-center">
                <Col xs={8} md={6} className="home-btns">
                    {theUser
                        ?
                        <>
                            <Link to="/products" className="btn btn-secondary">Products</Link>
                            <Link to="/profile" className="btn btn-secondary">My profile</Link>
                        </>
                        :
                        <>
                            <Link to="/signup" className="btn btn-secondary">Sign up</Link>
                            <Link to="/login" className="btn btn-secondary">Log in</Link>
                        </>
                    }
                </Col>
            </Row>
            <Toastie show={showToast} handleToast={handleToast} toastType={toastieInfo.toastType} toastText={toastieInfo.toastText} toastTitle={toastieInfo.toastTitle} />
        </Container>
    )
}

export default Home