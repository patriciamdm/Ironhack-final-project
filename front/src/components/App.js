import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AuthService from '../services/auth.service';

import Navigation from './Layout/Navigation';
import Home from './Pages/Home';
import Signup from './Pages/User/Signup';
import Login from './Pages/User/Login';
import Profile from './Pages/User/Profile';
import EditUser from './Pages/User/Edit-profile';
import ProductList from './Pages/Products/Products-list';
import NewProduct from './Pages/Products/New-product';
import ProductDetails from './Pages/Products/Prod-details';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new AuthService()
  }

  setUser = userInfo => this.setState({ loggedInUser: userInfo })

  componentDidMount = () => {
    this.authService
      .loggedin()
      .then(res => this.setUser(res.data))
      .catch(err => console.log('ERROR IN COMP MOUNT AUTH', err))
  }
  
  render() {
    return (
      <>
        <Navigation setUser={this.setUser} theUser={this.state.loggedInUser }/>
        <main>
          <Switch>
            <Route path='/' exact render={() => <Home theUser={this.state.loggedInUser } />} />
            <Route path='/signup' render={props => <Signup setUser={this.setUser} {...props} />} />
            <Route path='/login' render={props => <Login setUser={this.setUser} {...props} />} />
            <Route path='/profile' render={() => this.state.loggedInUser ? <Profile theUser={this.state.loggedInUser }/> : <Redirect to='/' />} />
            <Route path='/editUser/:userId' render={props => this.state.loggedInUser ? <EditUser theUser={this.state.loggedInUser } {...props} setUser={this.setUser}/> : <Redirect to='/' />} />
            <Route path='/products' exact render={() => this.state.loggedInUser ? <ProductList theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/products/new' exact render={props => this.state.loggedInUser ? <NewProduct theUser={this.state.loggedInUser} {...props} /> : <Redirect to='/' />} />
            <Route path='/products/:product_id' render={props => this.state.loggedInUser ? <ProductDetails theUser={this.state.loggedInUser} {...props} /> : <Redirect to='/' />} />
          </Switch>
        </main>
      </>
    )
  }
}

export default App;