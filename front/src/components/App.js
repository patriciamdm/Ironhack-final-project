//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AuthService from '../services/auth.service';


import Navigation from './Layout/Navigation';
import Footer from './Layout/Footer';

import Home from './Pages/Home/Home';
import Signup from './Pages/User/Signup';
import Login from './Pages/User/Login';

import UserProfile from './Pages/User/User-profile';
import EditUser from './Pages/User/Edit-profile';

import ProductList from './Pages/Products/Products-list';
import ProductDetails from './Pages/Products/Prod-details';
import NewProduct from './Pages/Products/New-product';

import UserList from './Pages/People/Users-list'
import OthersProfile from './Pages/People/Others-profile';
import ScrollToTop from './Layout/Scroll-top';


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

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  render() {
    return (
      <>
        <Navigation setUser={this.setUser} theUser={this.state.loggedInUser} />
        <main>
          <Switch>
            <Route path='/' exact render={() => <Home theUser={this.state.loggedInUser} />} />
            
            <Route path='/signup' render={props => <Signup setUser={this.setUser} {...props} />} />
            <Route path='/login' render={props => <Login setUser={this.setUser} {...props} />} />
            <Route path='/profile' exact render={() => this.state.loggedInUser ? <UserProfile theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/editUser/:userId' render={props => this.state.loggedInUser ? <EditUser theUser={this.state.loggedInUser} {...props} setUser={this.setUser} /> : <Redirect to='/' />} />
            
            <Route path='/products' exact render={() => this.state.loggedInUser ? <ProductList theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/products/new' exact render={props => this.state.loggedInUser ? <NewProduct theUser={this.state.loggedInUser} {...props} /> : <Redirect to='/' />} />
            <Route path='/products/:product_id' render={props => this.state.loggedInUser ? <ProductDetails theUser={this.state.loggedInUser} {...props} /> : <Redirect to='/' />} />
            
            <Route path='/users' render={() => this.state.loggedInUser ? <UserList theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/profile/:userId' render={props => this.state.loggedInUser ? <OthersProfile theUser={this.state.loggedInUser} {...props} /> : <Redirect to='/' />} />
          </Switch>
        </main>
        <Footer theUser={this.state.loggedInUser } />
        <ScrollToTop scrollToTop={this.scrollToTop}/>
      </>
    )
  }
}

export default App;