import React, { useState } from 'react';
import './App.css';
import productsDefault from './productsDefault'
import Cart from './components/Cart/Cart'
import Products from './components/Product/Product'
import Header from './components/Header/Header'


export default function App () {

  const [state, setState] = useState({
    productsDefault,
    filterByName: [],
    productsCart: localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts')) : [] ,
    isOpen: false
  })

  function filterByName(e){
    const findProduct = state.productsDefault.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setState(state  => ({
      ...state,
      filterByName: findProduct
    }))
  }
  
  function filterByPrice(order){
    if(order === "Low to High"){
      return setState({
        ...state,
        productsDefault: state.productsDefault.sort((a,b) => a.price - b.price)
      })
    }
    if(order === "High to Low"){
      return setState({
        ...state,
        productsDefault: state.productsDefault.sort((a,b) => a.price + b.price)
      })
    }
  }
  
  function addToCart(product){
    let exists = state.productsCart.findIndex(item => item.id === product.id )
    if(exists !== -1){
      state.productsCart[exists].quantity += 1
      localStorage.setItem('cartProducts', JSON.stringify(state.productsCart))
      return setState({
        ...state
      })
    }else{
      localStorage.setItem('cartProducts', JSON.stringify(state.productsCart))
      return setState({
        ...state,
        productsCart: state.productsCart.concat(product)
      })

    }
  }

  function increase (id){
    let exists = state.productsCart.findIndex(item => item.id === id )
    state.productsCart[exists].quantity += 1
    localStorage.setItem('cartProducts', JSON.stringify(state.productsCart))
    return setState({
        ...state
    })
  }

  function decrease(id){
    let exists = state.productsCart.findIndex(item => item.id === id )
    state.productsCart[exists].quantity -= 1
    localStorage.setItem('cartProducts', JSON.stringify(state.productsCart))
    return setState({
        ...state
    })
  }

  function product_delete(id){
      let newCartProduct = state.productsCart
      let indice = -1;
      state.productsCart.filter(async(item, i) => {
          if(id === item.id){
          indice = i
          }
      })
      newCartProduct.splice(indice, 1)
      localStorage.setItem('cartProducts', JSON.stringify(newCartProduct))
      return setState({
          ...state,
          productsCart: newCartProduct
      })
  }

  function sumTotal(){
      let total = 0;
      state.productsCart.map(async item => {
          total += item.price * item.quantity
      })
      return total
  }

  function showCart (){
    setState({...state, isOpen: !state.isOpen})
  }

  return (
    <div className="App">
      <div className="container">
        <Header click={showCart} filterByName={filterByName} filterByPrice={filterByPrice} productsCart={state.productsCart}/>
        {
          state.filterByName.length > 0 ? 
            <Products products={state.filterByName} addToCart={addToCart} showCart={showCart} stateCart={state.isOpen}/> 
            : 
            <Products products={state.productsDefault} addToCart={addToCart} showCart={showCart} stateCart={state.isOpen}/>
        }
      </div>
      {
        state.isOpen ? 
          <Cart
            hiddenCart={showCart} 
            productsCart={state.productsCart}
            increase={increase}
            decrease={decrease}
            deleteProductCart={product_delete}
            sumTotal={sumTotal}
          />  : false
      }
    </div>
  );
}