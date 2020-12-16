import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import Loader from '../../../Shared/Spinner'

// import CategoryService from '../../../../services/category.service'


// class AdminCategoryList extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             categories: undefined
//         }
//         this.categoryService = new CategoryService()
//     }

//     componentDidMount = () => {
//        this.categoryService
//             .getAllCategories()
//             .then(categs => this.setState({ categories: categs.data }, () => this.props.fillState(this.state.categories)))
//             .catch(err => console.log('ERROR GET CATEGS', err)) 
//     }

//     render() {
//         return (
//             <>
//                 <h3 style={{marginBottom: '0px'}}>Categories</h3>
//                 {this.state.categories
//                 ?
//                 <article className="admin-list">
//                     {this.state.categories.map(elm => <p key={elm._id} style={{ textTransform: 'capitalize', margin: '5px 0px' }}>{elm.name}</p>)}
//                 </article>
//                 :
//                 <Loader />
//                 }
//                 <Button variant="secondary" size="sm" onClick={() => this.props.categoriesModal()}>Manage categories</Button>
//             </>
//         )
//     }
// }


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