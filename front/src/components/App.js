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

import AdminPage from './Pages/Admin/Homepage/Admin-page';
import AdminProducts from './Pages/Admin/Prods/Admin-products'
import AdminUsers from './Pages/Admin/Users/Admin-users'
import DataStats from './Pages/Admin/Data-statistics/Data-stats'

import ProductList from './Pages/Products/Products-list';
import ProductDetails from './Pages/Products/Prod-details';

import UserList from './Pages/People/Users-list'
import OthersProfile from './Pages/People/Others-profile';
import ScrollToTop from './Layout/Scroll-top';

import Chat from './Chat/Chat'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: undefined,
      showToast: false,
      toastieInfo: {
        toastType: 'success',
        toastTitle: 'SUCCESS!',
        toastText: 'Profile deleted successfully.'
      },
      showNewToast: false
    }
    this.authService = new AuthService()
  }

  setUser = userInfo => this.setState({ loggedInUser: userInfo })

  componentDidMount = () => {
    this.authService
      .loggedin()
      .then(res => this.setUser(res.data))
      .catch(err => new Error('ERROR IN COMP MOUNT AUTH', err)) 
  }

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  handleDelToast = visib => this.setState({ showToast: visib })
  
  render() {
    return (
      <>
        <Navigation setUser={this.setUser} theUser={this.state.loggedInUser} />
        <main>
          <Switch>
            <Route path='/' exact render={() => <Home theUser={this.state.loggedInUser} handleToast={this.handleDelToast} showToast={this.state.showToast} toastieInfo={this.state.toastieInfo}/>} />
            
            <Route path='/admin' exact render={() => this.state.loggedInUser && this.state.loggedInUser.role === 'admin' ? <AdminPage theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/admin/products' render={() => this.state.loggedInUser && this.state.loggedInUser.role === 'admin' ? <AdminProducts theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/admin/users' render={() => this.state.loggedInUser && this.state.loggedInUser.role === 'admin' ? <AdminUsers theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/admin/data' render={() => this.state.loggedInUser && this.state.loggedInUser.role === 'admin' ? <DataStats theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            
            <Route path='/signup' render={props => <Signup setUser={this.setUser} {...props} />} />
            <Route path='/login' render={props => <Login setUser={this.setUser} {...props} />} />
            <Route path='/profile' exact render={props => this.state.loggedInUser ? <UserProfile theUser={this.state.loggedInUser} setUser={this.setUser} handleToast={() => this.handleDelToast(true)} {...props} /> : <Redirect to='/' />} />
            
            <Route path='/products' exact render={() => this.state.loggedInUser ? <ProductList theUser={this.state.loggedInUser} setUser={this.setUser} /> : <Redirect to='/' />} />
            <Route path='/products/:product_id' render={props => this.state.loggedInUser ? <ProductDetails theUser={this.state.loggedInUser} setUser={this.setUser} {...props} /> : <Redirect to='/' />} />
            
            <Route path='/users' render={() => this.state.loggedInUser ? <UserList theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
            <Route path='/profile/:userId' render={props => this.state.loggedInUser ? <OthersProfile theUser={this.state.loggedInUser} setUser={this.setUser} {...props} /> : <Redirect to='/' />} />

            <Route path='/chat' render={() => this.state.loggedInUser ? <Chat theUser={this.state.loggedInUser} /> : <Redirect to='/' />} />
          </Switch>
        </main>
        <Footer theUser={this.state.loggedInUser } />
        <ScrollToTop scrollToTop={this.scrollToTop}/>
      </>
    )
  }
}

export default App;