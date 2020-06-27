import React from 'react'
import './header.css'


export default function Navbar (props){
    console.log('Las props de Navbar ->', props)
    return(
        <div className="app-title">
            <div className="header">
                <h1>STORE</h1>
                <i className="fas fa-shopping-cart" onClick={props.click}></i><span className="length-products">{props.productsCart.length}</span>
            </div>
            <div className="header-settings">
                <div className="header-input">
                    <input type="search" className="btn-search" placeholder="Buscar..." onChange={(e) => props.filterByName(e)}></input>
                </div>
                <div className="header-select">
                    Order By Price: 
                    <select name="filterByPrice" className="select-filter"onChange={(e) => props.filterByPrice(e.target.value)}>
                        <option>Select</option>
                        <option>Low to High</option>
                        <option>High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
}