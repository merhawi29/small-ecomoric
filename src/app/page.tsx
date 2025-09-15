'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import TopHeader from '@/components/TopHeader';
import Navbar from '@/components/Navbar';
import CheckoutPage from '@/components/CheckoutPage';
import { sampleProducts } from '@/data/products';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCheckout, setShowCheckout] = useState(false);
  
  const categories = ['All', ...Array.from(new Set(sampleProducts.map(product => product.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? sampleProducts 
    : sampleProducts.filter(product => product.category === selectedCategory);

  if (showCheckout) {
    return (
      <CartProvider>
        <TopHeader />
        <Navbar onCheckout={() => setShowCheckout(true)} />
        <CheckoutPage onBack={() => setShowCheckout(false)} />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <TopHeader />
      <Navbar onCheckout={() => setShowCheckout(true)} />
      <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try selecting a different category.</p>
        </div>
          )}
      </main>

        {/* Footer removed: using global Footer component in layout */}
    </div>
    </CartProvider>
  );
}
