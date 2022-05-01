import React, { Component } from "react";
import Identicon from "identicon.js"; //user profile
import './navbar.css';
import dcss from "../../dcss.jpeg"; //logo

const path = window.location.pathname //returns the current url minus the domain name
class Navbar extends Component{
    render(){
    return (
      <div>
     <div className="backdrop"></div>
<header className="main-header">
    <button id="side-menu-toggle">Menu</button>
    <a className="navbar-brand" href="/">
      <div className="logo-image">
            <img src={dcss} width="40"
            height="30" className="img-fluid d-inline-block align-top" 
            alt="DCSS Logo"/>
      </div>
</a>
    <nav className="main-header__nav">
        <ul className="main-header__item-list">
            <li className="main-header__item">
                <a className={path ==='/'?'active':''} href="/">Home</a>
            </li>
            <li className="main-header__item">
                <a className={path ==='/explore'?'active':''} href="/explore">Explore</a>
            </li>
                <li className="main-header__item">
                    <a className={path ==='/user'?'active':''} href="/user">User</a>
                </li>
                <li className="main-header__item">
                    <a className={path ==='/creator'?'active':''} href="/creator">Creator</a>
                </li>
                <li className="main-header__item">
                    <a className={path ==='/creator/upload'?'active':''} href="/creator/upload">Upload
                    </a>
                </li>
        </ul>
        <ul className="main-header__item-list">
                <li className="main-header__item">
                <a className={path ==='/ads'?'active':''} href="/ads">Ads</a>
                </li>
                <li className="main-header__item">
                <a className={path ==='/uploadAd'?'active':''} href="/uploadAd">Upload Ad</a>
                </li>
                <li className="main-header__item">
                    <a className={path ==='/account'?'active':''} href="/account">Account</a>
                </li>
                <li className="main-header__item">
                <a className={path ==='/account'?'active':''} href="/account">{this.props.account}</a>
                </li>       
                <li class="main-header__item">
                {this.props.account ? (
                    <img
                    className="ml-2"
                    width="30"
                    height="30"
                    style={{marginLeft:'30px'}}
                    src={`data:image/png;base64,${new Identicon(
                        this.props.account,
                                    30
                        ).toString()}`}
                    alt="DCSS account address"
                />
                ) : (<span></span>)}
                </li>
        </ul>
    </nav>
</header>

{/* <nav class="mobile-nav">
    <ul class="mobile-nav__item-list">
        <li class="mobile-nav__item">
            <a class="<%= path === '/' ? 'active' : '' %>" href="/">Shop</a>
        </li>
        <li class="mobile-nav__item">
            <a class="<%= path === '/products' ? 'active' : '' %>" href="/products">Products</a>
        </li>
            <li class="mobile-nav__item">
                <a class="<%= path === '/cart' ? 'active' : '' %>" href="/cart">Cart</a>
            </li>
            <li class="mobile-nav__item">
                <a class="<%= path === '/orders' ? 'active' : '' %>" href="/orders">Orders</a>
            </li>
            <li class="mobile-nav__item">
                <a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">Add Product
                </a>
            </li>
            <li class="mobile-nav__item">
                <a class="<%= path === '/admin/products' ? 'active' : '' %>" href="/admin/products">Admin Products
                </a>
            </li>
            <li class="mobile-nav__item">
                <a class="<%= path === '/login' ? 'active' : '' %>" href="/login">Login</a>
            </li>
            <li class="mobile-nav__item">
                <a class="<%= path === '/signup' ? 'active' : '' %>" href="/signup">Signup</a>
            </li>
    </ul>
</nav> */}
      </div>
    );
  }
}
export default Navbar;