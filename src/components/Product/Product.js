import React from 'react'
import './product.css'

export default function Products (props){
    return(
        <div className="products">
            {props.products.map((item, index) => {
            return (
                <div className="product-default" key={index}>
                    <div className="data-product">
                        <h3>{item.name}</h3>
                        <p><strong>${item.price}</strong></p>
                    </div>
                    <div>
                        <div className="btn-addToCart"
                            onClick={() => {
                                props.addToCart({
                                    id: item.id,
                                    name: item.name, 
                                    price: item.price, 
                                    quantity: item.quantity
                                })
                            }}
                        >ADD TO CART</div>
                    </div>
                </div>
            )
            })}
        </div>
    )
}
