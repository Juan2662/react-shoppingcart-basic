import React from 'react'
import './Cart.css'

export default function Cart(props){
    return (
        <div className="navbar">
            <p className="hidden-cart" onClick={props.hiddenCart}>X</p>
            <div className="icon-cart">
                <i className="fas fa-shopping-cart"></i>
                <p>{props.productsCart.length}</p>
            </div>
            <div className="products-cart">
                {
                    props.productsCart.length > 0 ? props.productsCart.map((item, index) => {
                        return (
                            <div className="product" key={index}>
                                <div>
                                    <div className="datails-product">
                                        <h4 className="details-product-name">{item.name}</h4>
                                        <p className="price"><strong>${item.price * item.quantity}</strong></p>
                                    </div>
                                </div>
                                <div className="setting-products">
                                    <p className="quantity">Quantity: {item.quantity}</p>
                                    <div className="icons-product">
                                        <button 
                                            className="btn-product" 
                                            onClick={() => props.increase(item.id)}
                                        >+</button>
                                        <button 
                                            className="btn-product" 
                                            disabled={item.quantity > 1 ? false : true} 
                                            onClick={() => props.decrease(item.id)}
                                        >-</button>
                                        <button 
                                            className="btn-product" 
                                            onClick={() => props.deleteProductCart(item.id)}
                                        ><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <h4>You don't have products in your cart</h4>
                }
            </div>
            <div className="checkout-cart">
                <p>TOTAL: {props.sumTotal()}</p>
                <button type="button" >BUY NOW</button>
            </div>
        </div>

    );
}


