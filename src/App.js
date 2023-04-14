import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    console.log(cartList)

    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
    const verifyproduct = cartList.some(object => product.id === object.id)

    if (verifyproduct) {
      this.setState(object => ({
        cartList: object.cartList.map(objects => {
          if (objects.id === product.id) {
            return {...objects, quantity: objects.quantity + 1}
          }
          return objects
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const makefilter = cartList.filter(object => object.id !== id)
    this.setState({cartList: makefilter})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    console.log('decrease')
    const {cartList} = this.state
    this.setState(object => ({
      cartList: object.cartList.map(objects => {
        if (objects.id === id) {
          if (objects.quantity < 1) {
            return {...objects, quantity: objects.quantity}
          }
          return {...objects, quantity: objects.quantity - 1}
        }
        return objects
      }),
    }))
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState(object => ({
      cartList: object.cartList.map(objects => {
        if (objects.id === id) {
          return {...objects, quantity: objects.quantity + 1}
        }
        return objects
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
