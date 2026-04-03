import { useEffect, useState } from 'react';
import menuData from './data/menuData';
import NavbarMenu from './components/NavbarMenu';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import ThemeToggle from './components/ThemeToggle';
import ItemModal from './components/ItemModal';
import ToastAlert from './components/ToastAlert';
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // START CART EMPTY EVERY REFRESH
  const [cartItems, setCartItems] = useState([]);
  // END CART EMPTY EVERY REFRESH

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('bloomTheme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    name: '',
    diningType: 'Dine In',
    tableNumber: '',
    paymentMethod: 'Cash',
    notes: '',
  });

  // Remove cart localStorage
  // useEffect(() => {
  //   localStorage.setItem('bloomCart', JSON.stringify(cartItems));
  // }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('bloomTheme', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode-body');
    } else {
      document.body.classList.remove('dark-mode-body');
    }
  }, [darkMode]);

  const categories = ['All', ...new Set(menuData.map(item => item.category))];

  const filteredItems = menuData.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setToastMessage(`${item.name} added to your order ✨`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const increaseQty = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    setCartItems(updatedCart);
  };

  const openCheckout = () => {
    if (cartItems.length === 0) return;
    setShowCheckout(true);
  };

  const confirmOrder = () => {
    if (!checkoutData.name.trim()) {
      setToastMessage('Please enter your name first ✍️');
      setTimeout(() => setToastMessage(''), 2500);
      return;
    }

    if (
      checkoutData.diningType === 'Dine In' &&
      !checkoutData.tableNumber.trim()
    ) {
      setToastMessage('Please enter your table number 🍽️');
      setTimeout(() => setToastMessage(''), 2500);
      return;
    }

    const kitchenOrder = {
      orderId: Date.now(),
      customer: checkoutData.name,
      diningType: checkoutData.diningType,
      tableNumber:
        checkoutData.diningType === 'Dine In'
          ? checkoutData.tableNumber
          : 'Pickup',
      paymentMethod: checkoutData.paymentMethod,
      notes: checkoutData.notes,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      time: new Date().toLocaleString(),
      status: 'Sent to Kitchen',
    };

    localStorage.setItem('lastKitchenOrder', JSON.stringify(kitchenOrder));

    const previousOrders =
      JSON.parse(localStorage.getItem('bloomOrderHistory')) || [];
    localStorage.setItem(
      'bloomOrderHistory',
      JSON.stringify([kitchenOrder, ...previousOrders])
    );

    setCartItems([]); // clear cart after order
    setShowCheckout(false);
    setOrderSuccess(true);

    setCheckoutData({
      name: '',
      diningType: 'Dine In',
      tableNumber: '',
      paymentMethod: 'Cash',
      notes: '',
    });

    setTimeout(() => setOrderSuccess(false), 4000);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <NavbarMenu cartCount={totalCartCount} />

      <div className="container py-4">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="row g-4">
          <div className="col-lg-8">
            <MenuList
              items={filteredItems}
              addToCart={addToCart}
              openModal={setSelectedItem}
            />
          </div>

          <div className="col-lg-4">
            <Cart
              cartItems={cartItems}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              openCheckout={openCheckout}
            />
          </div>
        </div>
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          closeModal={() => setSelectedItem(null)}
          addToCart={addToCart}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          closeModal={() => setShowCheckout(false)}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
          confirmOrder={confirmOrder}
          cartItems={cartItems}
        />
      )}

      {toastMessage && <ToastAlert message={toastMessage} />}

      {orderSuccess && (
        <div className="kitchen-success">
          <div className="kitchen-box">
            <i className="bi bi-check-circle-fill success-icon"></i>
            <h4>Order Sent to Kitchen</h4>
            <p>Your order has been received successfully.</p>
            <small>Estimated preparation time: 15–20 mins 🍽️</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;