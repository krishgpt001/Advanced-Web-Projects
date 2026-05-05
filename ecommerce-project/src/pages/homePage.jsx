import './homePage.css';
import { Header } from '../components/Header';
import { products } from '../components/products.js';

export function HomePage() {
    return (
        <>
            <title>Ecommerce Project</title>
            <Header />

            <main className="home">
                <div className="items-grid">
                    {products.map((product) => {
                        return (
                            <div key={product.id} className="item-card">
                                <img src={product.image} alt={product.name} className="item-image" />
                                <h3 className="item-name">{product.name}</h3>
                                <div className="rating">
                                    <img className="product-rating-stars" src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                    <span className="rating-text">{product.rating.count}</span>
                                </div>
                                <p className="item-price">${(product.priceCents / 100).toFixed(2)}</p>
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
                        );
                    })}
                </div>
            </main>
        </>
    );
}