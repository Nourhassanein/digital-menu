import { useEffect, useState } from 'react';
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
import { fetchMenuData } from './data/menuData';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

  // ✅ FETCH MENU FROM BACKEND
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMenuData();
      setItems(data);
    };
    loadData();
  }, []);

  // ✅ SAVE DARK MODE
  useEffect(() => {
    localStorage.setItem('bloomTheme', JSON.stringify(darkMode));
  }, [darkMode]);

  // ✅ APPLY DARK MODE
  useEffect(() => {
    document.body.classList.toggle('dark-mode-body', darkMode);
  }, [darkMode]);

  // ✅ LOCK SCROLL WHEN MODAL OPEN
  useEffect(() => {
    document.body.style.overflow =
      selectedItem || showCheckout ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedItem, showCheckout]);

  // ✅ DYNAMIC CATEGORIES
  const categories = ['All', ...new Set(items.map(item => item.category))];

  // ✅ FILTER
  const filteredItems = items.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ✅ CART
  const addToCart = (item) => {
    const exist = cartItems.find(i => i.id === item.id);

    if (exist) {
      setCartItems(cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setToastMessage(`${item.name} added ✨`);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const increaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const openCheckout = () => {
    if (cartItems.length === 0) return;
    setShowCheckout(true);
  };

  // ✅ FINAL ORDER (CONNECTED TO BACKEND)
  const confirmOrder = async () => {
    if (!checkoutData.name.trim()) {
      setToastMessage('Enter your name ✍️');
      setTimeout(() => setToastMessage(''), 2000);
      return;
    }

    if (
      checkoutData.diningType === 'Dine In' &&
      !checkoutData.tableNumber.trim()
    ) {
      setToastMessage('Enter table number 🍽️');
      setTimeout(() => setToastMessage(''), 2000);
      return;
    }

    const orderData = {
      customer: checkoutData.name,
      diningType: checkoutData.diningType,
      tableNumber:
        checkoutData.diningType === 'Dine In'
          ? checkoutData.tableNumber
          : 'Pickup',
      paymentMethod: checkoutData.paymentMethod,
      notes: checkoutData.notes,
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) throw new Error("Failed");

      // ✅ SUCCESS
      setCartItems([]);
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

    } catch (error) {
      console.error(error);
      setToastMessage("Server error ❌");
    }
  };

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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
            <small>15–20 mins 🍽️</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;