import './homePage.css';
import { Header } from '../components/Header';

export function HomePage() {
    return (
        <>
            <title>Ecommerce Project</title>
            <Header />

            <main className="home">
                <div className="items-grid">
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