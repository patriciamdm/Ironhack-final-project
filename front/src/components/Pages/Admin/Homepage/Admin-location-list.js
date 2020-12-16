import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import Loader from '../../../Shared/Spinner'

//import LocationService from '../../../../services/location.service'


// class AdminLocationList extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             locations: undefined
//         }
//         this.locationService = new LocationService()
//     }

//     render() {
//         return (
//             <>
//                 <h3 style={{marginBottom: '0px'}}>Locations</h3>
//                 {this.state.locations
//                 ?
//                 <article className="admin-list">
//                     {this.state.locations.map(elm => <p key={elm._id} style={{ textTransform: 'capitalize', margin: '5px 0px' }}>{elm.name}</p>)}
//                 </article>
//                 :
//                 <Loader />
//                 }
//                 <Button variant="secondary" size="sm" onClick={() => this.props.locationsModal()}>Manage locations</Button>
//             </>
//         )
//     }
// }



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