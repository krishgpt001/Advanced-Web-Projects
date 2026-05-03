import { Link } from 'react-router';
import './Header.css';

export function Header(){
    return(
        <header className="nav-bar">
            <div className="left-section">
                <Link to="/" className="logo">BuyNest</Link>
            </div>
            <div className="search-bar middle-section">
                <input type="text" placeholder="Search here..." />
                <button>➜</button>
            </div>
            <div className="right-section">
                <Link to="/orders" className="orders-link">Orders</Link>
                <Link to="/checkout" className="cart-link">
                    <i className="fas fa-shopping-cart cart-icon"></i>
                    <span className="cart-quantity">3</span>
                    <span className="cart-text">Cart</span>
                </Link>
            </div>
        </header> 
    );
}