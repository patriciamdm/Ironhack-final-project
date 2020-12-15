import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import image from './glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg'

import BtsCarousel from './Carousel/Carousel-bts'
import Toastie from '../../Shared/PopUps/Toastie'

const Home = ({theUser, toastieInfo, handleToast, showToast}) => {
    return (
        <section style={{ textAlign: 'center' }}>
            <article style={{ padding: '70px 0px 140px' }}>
                <h1 style={{marginBottom: '40px', fontSize: '4em'}}>Welcome to Dealz_</h1>
                <h3>Te jode en tu armario? Mandalo a otro barrio!</h3>
            </article>
            <BtsCarousel />
            <Container>
                <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '130px 0px'}}>
                    <Col md={12} lg={6}>
                        <img style={{ width: '400px', height: '350px' }} src={image} alt={"Typing on computer"}/>
                    </Col>
                    <Col md={12} lg={6} style={{ padding: '30px', textAlign: 'left' }}>
                        <article className="home-texts">
                            <h3 style={{marginBottom: '20px'}}>Vende todo lo que no quieras.</h3>
                            <p>Elige entre diversas categorías, el lugar donde quieras vender y ponle un precio.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Inicia sesión o registrate y empieza a vender todo lo que ya no quieres.</p>
                        </article>
                        {theUser
                            ?
                            <div style={{textAlign: 'center'}}>
                                <Link to="/products" className="btn btn-secondary" style={{margin: '0px 10px'}}>Products</Link>
                                <Link to="/profile" className="btn btn-secondary" style={{margin: '0px 10px'}}>My profile</Link>
                            </div>
                            :
                            <div style={{textAlign: 'center'}}>
                                <Link to="/signup" className="btn btn-secondary" style={{margin: '0px 10px'}}>Sign up</Link>
                                <Link to="/login" className="btn btn-secondary" style={{margin: '0px 10px'}}>Log in</Link>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
            <Toastie show={showToast} handleToast={handleToast} toastType={toastieInfo.toastType} toastText={toastieInfo.toastText} toastTitle={toastieInfo.toastTitle} />
        </section>
        
    )
}

export default Home