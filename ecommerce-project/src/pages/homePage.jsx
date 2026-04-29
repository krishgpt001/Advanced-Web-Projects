// import { FaCartShopping } from "react-icons/fa6";
import './header.css';
import './homePage.css';

export function HomePage() {
    return (
        <>
            <header className="nav-bar">
            <div className="left-section">
                <h1>BuyNest</h1>
            </div>
            <div className="search-bar middle-section">
                <input type="text" placeholder="Search here..." />
                <button>➜</button>
            </div>
            <div className="right-section">
                <a href="/orders" className="orders-link">Orders</a>
                <a href="/cart" className="cart-link">
                    <i className="fas fa-shopping-cart cart-icon"></i>
                    <span className="cart-quantity">3</span>
                    <span className="cart-text">Cart</span>
                </a>
            </div>
            </header>

            <main className="home">
                <div className="itemss-grid">
                    <div className="item-card">
                        <img src="football.jpg" alt="Football" className="item-image" />
                        <h3 className="item-name">Football</h3>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span className="rating-text">87</span>
                        </div>
                        <p className="item-price">$20.95</p>
                        <select className="Quantity">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <button className="add-to-cart-button">Add to Cart</button>
                    </div>
                    <div className="item-card">
                        <img src="socks.jpg" alt="Socks" className="item-image" />
                        <h3 className="item-name">Socks</h3>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span className="rating-text">127</span>
                        </div>
                        <p className="item-price">$6.45</p>
                        <select className="Quantity">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <button className="add-to-cart-button">Add to Cart</button>
                    </div>
                    <div className="item-card">
                        <img src="shirt.jpg" alt="Shirt" className="item-image" />
                        <h3 className="item-name">Shirt</h3>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span className="rating-text">56</span>
                        </div>
                        <p className="item-price">$7.99</p>
                        <select className="Quantity">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <button className="add-to-cart-button">Add to Cart</button>
                    </div>
                    <div className="item-card">
                        <img src="controller.jpg" alt="Controller" className="item-image" />
                        <h3 className="item-name">Controller</h3>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span className="rating-text">48</span>
                        </div>
                        <p className="item-price">$21.32</p>
                        <select className="Quantity">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <button className="add-to-cart-button">Add to Cart</button>
                    </div>
                </div>
            </main>
        </>
    );
}