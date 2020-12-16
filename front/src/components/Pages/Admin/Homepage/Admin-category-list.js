import React from 'react'
import { Button } from 'react-bootstrap'

import Loader from '../../../Shared/Spinner'


const AdminCategoryList = props => {
    return (
        <>
            <h3 style={{marginBottom: '0px'}}>Categories</h3>
            {props.categories
            ?
            <article className="admin-list">
            {props.categories.map(elm => <p key={elm._id} style={{ textTransform: 'capitalize', margin: '5px 0px' }}>{elm.name}</p>)}
            </article>
            :
            <Loader />
            }
            <Button variant="secondary" size="sm" onClick={() => props.categoriesModal()}>Manage categories</Button>
        </>
    )
}

export default AdminCategoryList