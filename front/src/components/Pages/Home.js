import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Home = ({theUser}) => {
    return (
        <Container>
            <Row className="justify-content-center">
                <h4>Here goes a carousel because why not (:</h4>
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
        </Container>
    )
}

export default Home