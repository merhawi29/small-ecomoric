'use client';

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c1624] text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top contact row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="text-blue-400">📍</span>
            <span className="text-sm">Mekelle, Tigray</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-blue-400">📞</span>
            <span className="text-sm">+251 919 000 246</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-blue-400">✉️</span>
            <span className="text-sm">support@ecomoric.test</span>
          </div>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pt-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/image/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
              <span className="text-white font-semibold text-lg">Small Ecomoric</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">One platform. Infinite possibilities.</p>
            <div className="flex items-center space-x-4 text-blue-400">
              <a href="#" aria-label="Facebook" className="hover:text-white"></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"></a>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3"><span className="text-blue-400">🚚</span><span>Fast Delivery</span></li>
              <li className="flex items-center space-x-3"><span className="text-blue-400">↩️</span><span>Easy Returns</span></li>
              <li className="flex items-center space-x-3"><span className="text-blue-400">🔐</span><span>Secure Payments</span></li>
              <li className="flex items-center space-x-3"><span className="text-blue-400">🎧</span><span>24/7 Support</span></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-white font-semibold mb-4">Payment Methods</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3"><span className="text-blue-400">🏦</span><span>CBE Birr</span></li>
              <li className="flex items-center space-x-3"><span className="text-blue-400">📱</span><span>Telebirr</span></li>
              <li className="flex items-center space-x-3"><span className="text-blue-400">🏧</span><span>Bank Transfer</span></li>
              <li className="flex items-center space-x-3"><span className="text-blue-400">💵</span><span>Cash on Delivery</span></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="text-white font-semibold mb-4">Download App</h4>
            <div className="space-y-3">
              <a className="block w-44">
                <div className="w-full h-12 rounded-lg border border-blue-500/40 bg-blue-500/10 flex items-center justify-center text-white text-xs tracking-wide">
                  GET IT ON Google Play
                </div>
              </a>
              <a className="block w-44">
                <div className="w-full h-12 rounded-lg border border-blue-500/40 bg-blue-500/10 flex items-center justify-center text-white text-xs tracking-wide">
                  Download on the App Store
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10">
          <div className="flex items-center justify-center gap-4 mb-6">
          </div>
          <p className="text-center text-xs text-gray-400">© {new Date().getFullYear()} Small Ecomoric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


