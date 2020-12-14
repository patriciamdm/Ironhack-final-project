import React, { Component } from 'react'
import { Row, Dropdown, DropdownButton } from 'react-bootstrap'

import CategoryService from '../../services/category.service'
import LocationService from '../../services/location.service'


class FilterBtns extends Component {
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
            this.state.categories && this.state.locations
                ?
                <Row style={{ marginTop: '20px', marginBottom: '20px', height: '38px', alignContent: 'flex-start', padding: '0px 15px' }}>
                    <DropdownButton title="Sort" variant="secondary" >
                        <Dropdown.Item as="button" onClick={() => this.props.sortBy('newest')}>Newest</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.props.sortBy('available')}>Availability</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.props.sortBy('low price')}>Price, low to high</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.props.sortBy('high price')}>Price, high to low</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton title="Category" variant="secondary" >
                        <Dropdown.Item as="button" onClick={() => this.props.unfilter()}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        {this.state.categories.map(elm => <Dropdown.Item as="button" key={elm._id} onClick={() => this.props.filterBy(elm.name, 'category')}><span style={{ textTransform: 'capitalize' }}>{elm.name}</span></Dropdown.Item>)}
                    </DropdownButton>

                    <DropdownButton title="Location" variant="secondary" >
                        <Dropdown.Item as="button" onClick={() => this.props.unfilter()}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        {this.state.locations.map(elm => <Dropdown.Item as="button" key={elm._id} onClick={() => this.props.filterBy(elm.name, 'location')}><span style={{ textTransform: 'capitalize' }}>{elm.name}</span></Dropdown.Item>)}
                    </DropdownButton>
                    
                    <DropdownButton title="Availability" variant="secondary" >
                        <Dropdown.Item as="button" onClick={() => this.props.unfilter()}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => this.props.filterBy('available', 'status')}>Available</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.props.filterBy('reserved', 'status')}>Reserved</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.props.filterBy('sold', 'status')}>Sold</Dropdown.Item>
                    </DropdownButton>
                </Row>
                :
                <Row></Row>
        )
    }
}

export default FilterBtns