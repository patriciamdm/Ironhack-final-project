import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../../Shared/Spinner'


import CategoryService from '../../../services/category.service'
import LocationService from '../../../services/location.service'


class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: undefined,
            locations: undefined
        }
        this.categoryService = new CategoryService()
        this.locationService = new LocationService()
    }

    componentDidMount = () => {
        this.loadCategories()
        this.loadLocations()
    }

    loadCategories = () => {
        this.categoryService
            .getAllCategories()
            .then(categs => this.setState({ categories: categs.data }))
            .catch(err => console.log('ERROR GET CATEGS', err))        
    }

    loadLocations = () => {
        this.locationService
            .getAllLocations()
            .then(locs => this.setState({ locations: locs.data }))
            .catch(err => console.log('ERROR GET LOCATIONS', err))        
    }
    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <h1>Welcome to the Admin page, {this.props.theUser.username}</h1>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display: 'flex', flexDirection: 'column'}}>
                            <Link to="/admin/products" className="btn btn-secondary">Manage products</Link>
                            <Link to="/admin/users" className="btn btn-secondary">Manage users</Link>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <h3>Categories</h3>
                            <ul style={{listStyle: 'none', padding: '0px'}}>
                                {this.state.categories
                                    ?
                                    this.state.categories.map(elm => <li style={{ textTransform: 'capitalize' }}>{elm.name}</li>)
                                    :
                                    <Loader />
                                }
                            </ul>
                            <Button variant="secondary" size="sm">Add new category</Button>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <h3>Locations</h3>
                            {this.state.locations
                                ?
                                <ul style={{listStyle: 'none', padding: '0px'}}>
                                    {this.state.locations.map((elm, idx) => <li key={idx} style={{ textTransform: 'capitalize' }}>{elm.name}{idx}</li>)}
                                </ul>
                                :
                                <Loader />
                            }
                            
                            <Button variant="secondary" size="sm">Add new location</Button>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default AdminPage