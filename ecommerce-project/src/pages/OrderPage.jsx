import { Header } from "../components/Header";


export function OrderPage() {
    return (
    <>
        <title>Order Page</title>
        <Header />
        <main>
            <h1 className="title">Your Orders</h1>
            <div className="orders-list">
                <div className="order-card">
                    <div className="top-section">
                        <div className="left-section">
                            <h2 className="order-date-title">Order Date:</h2>
                            <h2 className="order-date">August 12, 2023</h2>
                        </div>
                        <div className="middle-section">
                            <h2 className="total">Total:</h2>
                            <h2 className="total-price">$150.00</h2>
                        </div>
                        <div className="right-section">
                            <h2 className="order-id-title">Order ID:</h2>
                            <h2 className="order-id">27cdeghs-38jnef64-gye5nv48nv47</h2>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <div className="item-card">
                            <img src="socks.jpg" alt="Socks" className="item-image" />
                            <div className="item-details">
                                <h2 className="item-name">Cozy Socks</h2>
                                <h3 className="delivery-date">Arriving on: August 15, 2023</h3>
                                <h3 className="item-quantity">Quantity: 2</h3>
                                <button className="add-to-cart-button">Add to Cart</button>
                            </div>
                            <button className="track-button">Track Order</button>
                        </div>
                        <div className="item-card">
                            <img src="football.jpg" alt="Football" className="item-image" />
                            <div className="item-details">
                                <h2 className="item-name">Football</h2>
                                <h3 className="delivery-date">Arriving on: August 15, 2023</h3>
                                <h3 className="item-quantity">Quantity: 2</h3>
                                <button className="add-to-cart-button">Add to Cart</button>
                            </div>
                            <button className="track-button">Track Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
    );
}