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
                        {this.state.categories.map((elm, idx) => <Dropdown.Item as="button" key={idx} onClick={() => this.props.filterBy('category', elm)}><p style={{ textTransform: 'capitalize' }}>{elm.name}</p></Dropdown.Item>)}
                    </DropdownButton>

                    <DropdownButton title="Location" variant="secondary" >
                        <Dropdown.Item as="button" onClick={() => this.props.unfilter()}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        {this.state.locations.map((elm, idx) => <Dropdown.Item as="button" key={idx} onClick={() => this.props.filterBy('location', elm)}><span style={{ textTransform: 'capitalize' }}>{elm}</span></Dropdown.Item>)}
                    </DropdownButton>
                    
                    <DropdownButton title="Availability" variant="secondary" >
                        <Dropdown.Item as="button" onClick={() => this.props.unfilter()}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={() => this.props.filterBy('status', 'available')}>Available</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.props.filterBy('status', 'reserved')}>Reserved</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.props.filterBy('status', 'sold')}>Sold</Dropdown.Item>
                    </DropdownButton>
                </Row>
                :
                <Row></Row>
        )
    }
}

export default FilterBtns