import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Header, 
  HeroSection, 
  ProductsGrid, 
  FeaturedCategories, 
  Footer, 
  ShoppingCart 
} from './components';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    category: 'iPhone',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1616410011236-7a42121dd981?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxpUGhvbmV8ZW58MHx8fHwxNzUzNjI1MDEzfDA&ixlib=rb-4.1.0&q=85',
    description: 'The ultimate iPhone with titanium design, A18 Pro chip, and pro camera system.',
    rating: 4.8,
    reviews: 1247
  },
  {
    id: 2,
    name: 'Mac Studio M4',
    category: 'Mac',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1648877424884-121ea2ccf22a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxNYWMlMjBTdHVkaW98ZW58MHx8fHwxNzUzNjI1MDE4fDA&ixlib=rb-4.1.0&q=85',
    description: 'Supercharged by M4 chip. Extraordinary performance in an incredibly compact design.',
    rating: 4.9,
    reviews: 892
  },
  {
    id: 3,
    name: 'iPad Pro M4',
    category: 'iPad',
    price: 799,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxpUGFkJTIwUHJvfGVufDB8fHx8MTc1MzYyNTAyNHww&ixlib=rb-4.1.0&q=85',
    description: 'Unbelievably thin. Incredibly powerful. With M4 chip and stunning display.',
    rating: 4.7,
    reviews: 1523
  },
  {
    id: 4,
    name: 'Apple Watch Ultra 3',
    category: 'Watch',
    price: 799,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxBcHBsZSUyMFdhdGNofGVufDB8fHx8MTc1MzYyNTAyOHww&ixlib=rb-4.1.0&q=85',
    description: 'The ultimate sports watch. Built for endurance athletes and outdoor adventures.',
    rating: 4.6,
    reviews: 734
  },
  {
    id: 5,
    name: 'AirPods Pro (3rd generation)',
    category: 'AirPods',
    price: 249,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxBaXJQb2RzfGVufDB8fHx8MTc1MzYyNTAzM3ww&ixlib=rb-4.1.0&q=85',
    description: 'Adaptive Audio. Conversation Awareness. Personalized Spatial Audio.',
    rating: 4.5,
    reviews: 2156
  },
  {
    id: 6,
    name: 'Apple TV 4K',
    category: 'TV',
    price: 179,
    image: 'https://images.unsplash.com/photo-1621685950846-9323d993bbf3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxBcHBsZSUyMFRWfGVufDB8fHx8MTc1MzYyNTAzOXww&ixlib=rb-4.1.0&q=85',
    description: 'The Apple experience you love. On the biggest screen in your home.',
    rating: 4.4,
    reviews: 987
  },
  {
    id: 7,
    name: 'iPhone 16',
    category: 'iPhone',
    price: 799,
    image: 'https://images.unsplash.com/photo-1616410011236-7a42121dd981?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxpUGhvbmV8ZW58MHx8fHwxNzUzNjI1MDEzfDA&ixlib=rb-4.1.0&q=85',
    description: 'Built for Apple Intelligence. Featuring Camera Control and A18 chip.',
    rating: 4.7,
    reviews: 2340
  },
  {
    id: 8,
    name: 'MacBook Air M4',
    category: 'Mac',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1650105312043-647cc3ac893e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxNYWMlMjBTdHVkaW98ZW58MHx8fHwxNzUzNjI1MDE4fDA&ixlib=rb-4.1.0&q=85',
    description: 'Superlight. Superfast. Supercharged by M4.',
    rating: 4.8,
    reviews: 1678
  },
  {
    id: 9,
    name: 'iPad Air M4',
    category: 'iPad',
    price: 599,
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxpUGFkJTIwUHJvfGVufDB8fHx8MTc1MzYyNTAyNHww&ixlib=rb-4.1.0&q=85',
    description: 'Serious performance. Seriously portable. Now with M4 chip.',
    rating: 4.6,
    reviews: 1234
  },
  {
    id: 10,
    name: 'Apple Watch Series 10',
    category: 'Watch',
    price: 399,
    image: 'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxBcHBsZSUyMFdhdGNofGVufDB8fHx8MTc1MzYyNTAyOHww&ixlib=rb-4.1.0&q=85',
    description: 'Thinner. Bigger. Brighter. The biggest Apple Watch redesign ever.',
    rating: 4.5,
    reviews: 1456
  },
  {
    id: 11,
    name: 'AirPods Max',
    category: 'AirPods',
    price: 549,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxBaXJQb2RzfGVufDB8fHx8MTc1MzYyNTAzM3ww&ixlib=rb-4.1.0&q=85',
    description: 'Computational audio. Listen to the impossible.',
    rating: 4.3,
    reviews: 876
  },
  {
    id: 12,
    name: 'Apple Accessories Bundle',
    category: 'Accessories',
    price: 199,
    image: 'https://images.unsplash.com/photo-1563549054059-bf4ebe2f49d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxBcHBsZSUyMGFjY2Vzc29yaWVzfGVufDB8fHx8MTc1MzYyNTA0Nnww&ixlib=rb-4.1.0&q=85',
    description: 'Essential Apple accessories for your devices. MagSafe, cables, and more.',
    rating: 4.4,
    reviews: 543
  }
];

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header cartItems={totalItems} />
      <HeroSection />
      <FeaturedCategories />
      <ProductsGrid products={mockProducts} onAddToCart={addToCart} />
      <Footer />
      
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeFromCart}
      />
      
      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-40 transition-colors"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
        </button>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;