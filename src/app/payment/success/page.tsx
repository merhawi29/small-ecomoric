'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

const PaymentSuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  const txRef = searchParams.get('tx_ref') || searchParams.get('txRef') || searchParams.get('reference') || '';
  const status = (searchParams.get('status') || '').toLowerCase();

  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [cleared, clearCart]);

  useEffect(() => {
    // If gateway sends explicit failure, redirect to home with a notice
    if (status && !['success', 'paid', 'completed'].includes(status)) {
      router.replace('/');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Thank you! Your payment was processed successfully.</p>

        {txRef ? (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-left mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Reference:</span> {txRef}
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;


