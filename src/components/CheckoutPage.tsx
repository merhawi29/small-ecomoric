'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

interface CheckoutPageProps {
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    houseNumber: '',
    paymentMethod: ''
  });
  const [showDigitalWallets, setShowDigitalWallets] = useState(false);
  const [showBranchPayments, setShowBranchPayments] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Close dropdowns when a payment method is selected
    if (name === 'paymentMethod') {
      if (['tele-birr', 'cbe-birr', 'm-pesa', 'hello-cash', 'amole', 'kacha', 'chapa'].includes(value)) {
        setShowDigitalWallets(false);
      }
      if (['cbe', 'awash', 'abyssinia', 'dashen', 'nib', 'wegagen', 'zemen', 'bunna', 'coop'].includes(value)) {
        setShowBranchPayments(false);
      }
    }
  };

  const handlePlaceOrder = () => {
    if (!formData.paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }
    // Here you would typically send the order to your backend
    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button onClick={onBack} className="text-blue-600 hover:text-blue-800">
              Home
            </button>
            <span className="text-gray-400">→</span>
            <span className="text-gray-600">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Checkout Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-2 border border-gray-300 border-r-0 rounded-l-md bg-gray-50">
                      <span className="text-sm text-gray-500">🇪🇹 +251</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter your address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your address (e.g., street name)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    House Number
                  </label>
                  <input
                    type="text"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="House number"
                  />
                </div>
                {/* Map placeholder */}
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-gray-500">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-sm">St. Mariam mani church</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Option *</h2>
              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label className={`group flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  formData.paymentMethod === 'cash' 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:shadow-sm'
                }`} style={{
                  backgroundColor: formData.paymentMethod === 'cash' ? '#F0F7FF' : '#FFFFFF',
                  borderColor: formData.paymentMethod === 'cash' ? '#2563EB' : '#E5E7EB'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="mr-4 w-4 h-4 text-green-600"
                  />
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-sm">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-lg" style={{ color: '#0F172A' }}>Cash-on Delivery</div>
                      <div className="text-sm" style={{ color: '#64748B' }}>Pay when your order arrives</div>
                    </div>
                  </div>
                </label>

                {/* Digital Wallet */}
                <div className={`border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                  showDigitalWallets ? 'border-blue-400 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`} style={{
                  backgroundColor: ['tele-birr', 'cbe-birr', 'm-pesa', 'hello-cash'].includes(formData.paymentMethod) ? '#F0F7FF' : '#FFFFFF',
                  borderColor: ['tele-birr', 'cbe-birr', 'm-pesa', 'hello-cash'].includes(formData.paymentMethod) ? '#2563EB' : '#E5E7EB'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowDigitalWallets(!showDigitalWallets)}
                    className={`w-full flex items-center p-4 cursor-pointer transition-all duration-200 ${
                      showDigitalWallets ? 'bg-blue-50' : 'hover:bg-blue-25'
                    }`}
                    style={{
                      backgroundColor: ['tele-birr', 'cbe-birr', 'm-pesa', 'hello-cash'].includes(formData.paymentMethod) ? '#F0F7FF' : 'transparent'
                    }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-sm">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-lg" style={{ color: '#0F172A' }}>
                        {formData.paymentMethod === 'tele-birr' ? 'Tele-Birr' :
                         formData.paymentMethod === 'cbe-birr' ? 'CBE-Birr' :
                         formData.paymentMethod === 'm-pesa' ? 'M-Pesa' :
                         formData.paymentMethod === 'hello-cash' ? 'HelloCash Wegagen' :
                         formData.paymentMethod === 'amole' ? 'Amole Digital Wallet' :
                         formData.paymentMethod === 'kacha' ? 'Kacha Digital Wallet' :
                         formData.paymentMethod === 'chapa' ? 'Chapa Payment' :
                         'Digital Wallet'}
                      </div>
                      <div className="text-sm" style={{ color: '#64748B' }}>
                        {['tele-birr', 'cbe-birr', 'm-pesa', 'hello-cash', 'amole', 'kacha', 'chapa'].includes(formData.paymentMethod) 
                          ? 'Mobile payment solution' 
                          : 'Mobile payment solutions'}
                      </div>
                    </div>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showDigitalWallets ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDigitalWallets && (
                    <div className="p-4 space-y-3" style={{ backgroundColor: '#FFFFFF' }}>
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'tele-birr' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'tele-birr' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'tele-birr' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'tele-birr') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'tele-birr') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="tele-birr"
                          checked={formData.paymentMethod === 'tele-birr'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">TB</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Tele-Birr</span>
                      </label>
                      
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'cbe-birr' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'cbe-birr' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'cbe-birr' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'cbe-birr') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'cbe-birr') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cbe-birr"
                          checked={formData.paymentMethod === 'cbe-birr'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">CB</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>CBE-Birr</span>
                      </label>
                      
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'm-pesa' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'm-pesa' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'm-pesa' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'm-pesa') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'm-pesa') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="m-pesa"
                          checked={formData.paymentMethod === 'm-pesa'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">MP</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>M-Pesa</span>
                      </label>
                      
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'hello-cash' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'hello-cash' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'hello-cash' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'hello-cash') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'hello-cash') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="hello-cash"
                          checked={formData.paymentMethod === 'hello-cash'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">H</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>HelloCash Wegagen</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'amole' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'amole' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'amole' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'amole') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'amole') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="amole"
                          checked={formData.paymentMethod === 'amole'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">A</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Amole Digital Wallet</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'kacha' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'kacha' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'kacha' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'kacha') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'kacha') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="kacha"
                          checked={formData.paymentMethod === 'kacha'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">K</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Kacha Digital Wallet</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'chapa' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'chapa' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'chapa' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'chapa') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'chapa') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="chapa"
                          checked={formData.paymentMethod === 'chapa'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">C</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Chapa Payment</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Branch Payment */}
                <div className={`border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                  showBranchPayments ? 'border-blue-400 shadow-md' : 'border-gray-200 hover:border-blue-300'
                }`} style={{
                  backgroundColor: ['cbe', 'awash', 'abyssinia', 'dashen'].includes(formData.paymentMethod) ? '#F0F7FF' : '#FFFFFF',
                  borderColor: ['cbe', 'awash', 'abyssinia', 'dashen'].includes(formData.paymentMethod) ? '#2563EB' : '#E5E7EB'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowBranchPayments(!showBranchPayments)}
                    className={`w-full flex items-center p-4 cursor-pointer transition-all duration-200 ${
                      showBranchPayments ? 'bg-blue-50' : 'hover:bg-blue-25'
                    }`}
                    style={{
                      backgroundColor: ['cbe', 'awash', 'abyssinia', 'dashen'].includes(formData.paymentMethod) ? '#F0F7FF' : 'transparent'
                    }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-sm">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-lg" style={{ color: '#0F172A' }}>
                        {formData.paymentMethod === 'cbe' ? 'Commercial Bank of Ethiopia' :
                         formData.paymentMethod === 'awash' ? 'Awash Bank' :
                         formData.paymentMethod === 'abyssinia' ? 'Bank of Abyssinia' :
                         formData.paymentMethod === 'dashen' ? 'Dashen Bank' :
                         formData.paymentMethod === 'nib' ? 'Nib International Bank' :
                         formData.paymentMethod === 'wegagen' ? 'Wegagen Bank' :
                         formData.paymentMethod === 'zemen' ? 'Zemen Bank' :
                         formData.paymentMethod === 'bunna' ? 'Bunna Bank' :
                         formData.paymentMethod === 'coop' ? 'Cooperative Bank of Oromia' :
                         'Branch Payment'}
                      </div>
                      <div className="text-sm" style={{ color: '#64748B' }}>
                        {['cbe', 'awash', 'abyssinia', 'dashen', 'nib', 'wegagen', 'zemen', 'bunna', 'coop'].includes(formData.paymentMethod) 
                          ? 'Bank branch payment' 
                          : 'Pay at bank branches'}
                      </div>
                    </div>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showBranchPayments ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showBranchPayments && (
                    <div className="p-4 space-y-3" style={{ backgroundColor: '#F0F7FF' }}>
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'cbe' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'cbe' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'cbe' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'cbe') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'cbe') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cbe"
                          checked={formData.paymentMethod === 'cbe'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">CBE</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Commercial Bank of Ethiopia</span>
                      </label>
                      
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'awash' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'awash' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'awash' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'awash') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'awash') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="awash"
                          checked={formData.paymentMethod === 'awash'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">A</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Awash Bank</span>
                      </label>
                      
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'abyssinia' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'abyssinia' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'abyssinia' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'abyssinia') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'abyssinia') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="abyssinia"
                          checked={formData.paymentMethod === 'abyssinia'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">★</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Bank of Abyssinia</span>
                      </label>
                      
                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'dashen' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'dashen' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'dashen' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'dashen') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'dashen') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="dashen"
                          checked={formData.paymentMethod === 'dashen'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">D</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Dashen Bank</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'nib' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'nib' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'nib' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'nib') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'nib') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="nib"
                          checked={formData.paymentMethod === 'nib'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">N</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Nib International Bank</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'wegagen' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'wegagen' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'wegagen' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'wegagen') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'wegagen') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="wegagen"
                          checked={formData.paymentMethod === 'wegagen'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">W</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Wegagen Bank</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'zemen' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'zemen' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'zemen' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'zemen') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'zemen') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="zemen"
                          checked={formData.paymentMethod === 'zemen'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">Z</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Zemen Bank</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'bunna' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'bunna' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'bunna' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'bunna') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'bunna') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bunna"
                          checked={formData.paymentMethod === 'bunna'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">B</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Bunna Bank</span>
                      </label>

                      <label 
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === 'coop' 
                            ? 'shadow-lg transform scale-105' 
                            : 'hover:shadow-md hover:scale-102'
                        }`} 
                        style={{
                          backgroundColor: formData.paymentMethod === 'coop' ? '#F0F7FF' : '#FFFFFF',
                          borderColor: formData.paymentMethod === 'coop' ? '#2563EB' : '#E5E7EB',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.paymentMethod !== 'coop') {
                            e.currentTarget.style.backgroundColor = '#F0F7FF';
                            e.currentTarget.style.borderColor = '#93C5FD';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.paymentMethod !== 'coop') {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="coop"
                          checked={formData.paymentMethod === 'coop'}
                          onChange={handleInputChange}
                          className="mr-4 w-4 h-4"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                          <span className="text-white text-sm font-bold">C</span>
                        </div>
                        <span className="font-semibold" style={{ color: '#0F172A' }}>Cooperative Bank of Oromia</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Order Summary */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 mt-6"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
