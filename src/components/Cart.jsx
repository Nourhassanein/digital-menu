function Cart({ cartItems, increaseQty, decreaseQty, openCheckout }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-card shadow-sm">
      <h4 className="fw-bold mb-3">
        <i className="bi bi-bag-heart me-2"></i> Your Order
      </h4>

      <p className="kitchen-note mb-4">
        Orders are prepared through our digital kitchen display system.
      </p>

      {cartItems.length === 0 ? (
        <div className="text-center py-4">
          <i className="bi bi-bag-x fs-1 mb-3 d-block text-muted"></i>
          <h6 className="fw-bold">Your table is waiting 🍽️</h6>
          <p className="text-muted mb-0">
            Add a few dishes to begin your Bloom & Bite experience.
          </p>
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center cart-item"
              >
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <small className="text-muted">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </small>
                </div>

                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold">Total</h5>
            <h5 className="mb-0 fw-bold">${total.toFixed(2)}</h5>
          </div>

          <button className="btn kitchen-btn w-100" onClick={openCheckout}>
            <i className="bi bi-credit-card-2-front me-2"></i>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;