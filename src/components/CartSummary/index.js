import CartContext from '../../context/CartContext'
import './index.css'

const Summary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      const findtotal = cartList.forEach(object => {
        total += object.quantity * object.price
      })
      console.log(cartList)
      console.log('demo')
      return (
        <h1 className="head">
          Total Amount to be paid: Rs.<span className="amount">{total}</span>
          /-
        </h1>
      )
    }}
  </CartContext.Consumer>
)

export default Summary
