import React from 'react'
import { Button } from 'react-bootstrap'

import Loader from '../../../Shared/Spinner'


const AdminLocationList = props => {
    return (
        <>
                <h3 style={{marginBottom: '0px'}}>Locations</h3>
                {props.locations
                ?
                <article className="admin-list">
                    {props.locations.map(elm => <p key={elm._id} style={{ textTransform: 'capitalize', margin: '5px 0px' }}>{elm.name}</p>)}
                </article>
                :
                <Loader />
                }
                <Button variant="secondary" size="sm" onClick={() => props.locationsModal()}>Manage locations</Button>
            </>
    )
}

export default AdminLocationList