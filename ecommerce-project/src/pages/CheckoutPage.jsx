import { Link } from 'react-router';
import './CheckoutPage.css'
import { IoBagCheckOutline } from "react-icons/io5";

export function CheckoutPage() {
    return (
        <>
            <title>Checkout</title>
            <header className="checkout-header">
                <div className="left-section">
                    <Link to="/" className="logo">BuyNest</Link>
                </div>
                <div className="middle-section">
                    <h1>Checkout<span className="checkout-items">(3 items)</span></h1>
                </div>
                <div className="right-section">
                   <IoBagCheckOutline className="header-icon" />
                </div>
            </header>
            <main className="checkout-summary">
                <h1 className="checkout-title">Review your order</h1>
                <div className="checkout-summary-separator">
                    <div className="chechout-items-grid left-section">
                        <div className="checkout-item-card">
                            <h1 className="delivery-date">Delivery Date:Tuesday, June 21</h1>
                            <div className="item-card-details">
                                <div className="left-section">
                                    <img src="socks.jpg" alt="Socks" className="product-image" />
                                    <div className="product-info">
                                        <h2 className="product-name">Cozy Socks</h2>
                                        <p className="product-price">$10.90</p>
                                        <div className="quantity-box">
                                            <p className="product-quantity">Quantity: 2</p>
                                            <button className="update-button">Update</button>
                                            <button className="delete-button">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-section">
                                    <h3 className="delivery-options">Choose a delivery option:</h3>
                                    <div className="delivery-dates">
                                        <label className="delivery-option">
                                            <input type="radio" name="delivery-1" value="0" defaultChecked />
                                            <div className="delivery-info">
                                                <span className="delivery-date">Tuesday, June 21</span> 
                                                <span className="delivery-amount">Free Shipping</span>
                                            </div>
                                        </label>
                                        <label className="delivery-option">
                                            <input type="radio" name="delivery-1" value="5" />
                                            <div className="delivery-info">
                                                <span className="delivery-date">Wednesday, June 15</span>
                                                <span className="delivery-amount">$5.00 Shipping</span>
                                            </div>
                                        </label>
                                        <label className="delivery-option">
                                            <input type="radio" name="delivery-1" value="9.99" />
                                            <div className="delivery-info">
                                                <span className="delivery-date">Monday, June 13</span>
                                                <span className="delivery-amount">$9.99 Shipping</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-item-card">
                            <h1 className="delivery-date">Delivery Date:Tuesday, June 21</h1>
                            <div className="item-card-details">
                                <div className="left-section">
                                    <img src="Football.jpg" alt="Football" className="product-image" />
                                    <div className="product-info">
                                        <h2 className="product-name">Football</h2>
                                        <p className="product-price">$49.99</p>
                                        <div className="quantity-box">
                                            <p className="product-quantity">Quantity: 1</p>
                                            <button className="update-button">Update</button>
                                            <button className="delete-button">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-section">
                                    <h3 className="delivery-options">Choose a delivery option:</h3>
                                    <div className="delivery-dates">
                                        <label className="delivery-option">
                                            <input type="radio" name="delivery-2" value="0" defaultChecked />
                                            <div className="delivery-info">
                                                <span className="delivery-date">Tuesday, June 21</span> 
                                                <span className="delivery-amount">Free Shipping</span>
                                            </div>
                                        </label>
                                        <label className="delivery-option">
                                            <input type="radio" name="delivery-2" value="5" />
                                            <div className="delivery-info">
                                                <span className="delivery-date">Wednesday, June 15</span>
                                                <span className="delivery-amount">$5.00 Shipping</span>
                                            </div>
                                        </label>
                                        <label className="delivery-option">
                                            <input type="radio" name="delivery-2" value="9.99" />
                                            <div className="delivery-info">
                                                <span className="delivery-date">Monday, June 13</span>
                                                <span className="delivery-amount">$9.99 Shipping</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-summary-box right-section">
                        <h1 className="payment-title">Payment Summary</h1>
                        <div className="purchase-amounts">
                            <h3 className="subtotal">Items(3): <span className="amount">$150.00</span></h3>
                            <h3 className="shipping">Shipping & Handling: <span className="amount">$10.00</span></h3>
                            <h3 className="tax">Total before Tax: <span className="amount">$160.00</span></h3>
                            <h3 className="tax">Estimated Tax(10%): <span className="amount">$16.00</span></h3>
                            <hr />
                            <h3 className="total">Total: <span className="amount">$176.00</span></h3>
                        </div>
                        <button className="checkout-button">Place Your Order</button>
                    </div>
                </div>
            </main>
        </>
    );
}