import React from 'react'
import { Row, Dropdown, DropdownButton } from 'react-bootstrap'

const FilterBtns = props => {
    return (
        <Row style={{marginTop: '20px', marginBottom: '20px', height: '38px', alignContent: 'flex-start', padding: '0px 15px'}}>
            <DropdownButton title="Sort" variant="secondary" >
                <Dropdown.Item as="button" onClick={() => props.sortBy('newest')}>Newest</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => props.sortBy('available')}>Availability</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => props.sortBy('low price')}>Price, low to high</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => props.sortBy('high price')}>Price, high to low</Dropdown.Item>
            </DropdownButton>

            <DropdownButton title="Category" variant="secondary" >
                <Dropdown.Item as="button" onClick={() => props.unfilter()}>All</Dropdown.Item>
                <Dropdown.Divider/>
                {props.categories.map((elm, idx) => <Dropdown.Item as="button" key={idx} onClick={() => props.filterBy('category', elm)}><span style={{ textTransform: 'capitalize'}}>{elm}</span></Dropdown.Item>)}
            </DropdownButton>

            <DropdownButton title="Location" variant="secondary" >
                <Dropdown.Item as="button" onClick={() => props.unfilter()}>All</Dropdown.Item>
                <Dropdown.Divider />
                {props.locations.map((elm, idx) => <Dropdown.Item as="button" key={idx} onClick={() => props.filterBy('location', elm)}><span style={{ textTransform: 'capitalize'}}>{elm}</span></Dropdown.Item>)}
            </DropdownButton>
            
            <DropdownButton title="Availability" variant="secondary" >
                <Dropdown.Item as="button" onClick={() => props.unfilter()}>All</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={() => props.filterBy('status', 'available')}>Available</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => props.filterBy('status', 'reserved')}>Reserved</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => props.filterBy('status', 'sold')}>Sold</Dropdown.Item>
            </DropdownButton>
        </Row>
    )
}

export default FilterBtns