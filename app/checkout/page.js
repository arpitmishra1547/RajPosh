'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user, isLoaded, login } = useAuth();
  const [step, setStep] = useState(user ? 2 : 1);
  const [mounted, setMounted] = useState(false);

  // Only set initial step after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (user) {
      setStep(2);
    }
  }, [user]);

  const [shippingData, setShippingData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isLoaded || !mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  // Redirect to cart if no items
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 mt-24">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <Link href="/cart">
            <Button>Back to Cart</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  // Step 1: Login
  if (step === 1) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 max-w-md">
        <Link href="/cart" className="flex items-center gap-2 text-[#b99b77] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Login to Checkout</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Password"
              />
            </div>

            <Button
              onClick={async () => {
                try {
                  setError('');
                  setIsLoading(true);
                  await login(loginData.email, loginData.password);
                  setStep(2);
                } catch (err) {
                  setError(err.message);
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              className="w-full bg-[#b99b77] text-white hover:bg-[#a88a66]"
            >
              {isLoading ? 'Logging in...' : 'Login & Continue'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/account" className="text-[#b99b77] hover:underline font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Shipping Address
  if (step === 2) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Shipping Address</h1>
          <button
            onClick={() => setStep(1)}
            className="text-[#b99b77] hover:underline text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                value={shippingData.fullName}
                onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={shippingData.email}
                onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input
                value={shippingData.phone}
                onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <Input
                value={shippingData.pincode}
                onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value })}
                placeholder="Pincode"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={shippingData.address}
              onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
              placeholder="Street Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b99b77]"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <Input
                value={shippingData.city}
                onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <Input
                value={shippingData.state}
                onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                placeholder="State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <Input value="India" disabled className="bg-gray-100" />
            </div>
          </div>

          <Button
            onClick={() => setStep(3)}
            className="w-full bg-[#b99b77] text-white hover:bg-[#a88a66]"
          >
            Continue to Review
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Order Review
  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Order Review</h1>
          <button
            onClick={() => setStep(2)}
            className="text-[#b99b77] hover:underline text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-4 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#b99b77]">
                      ₹{Math.round(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address Review */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>{shippingData.fullName}</strong></p>
                <p>{shippingData.address}</p>
                <p>{shippingData.city}, {shippingData.state} {shippingData.pincode}</p>
                <p>Phone: {shippingData.phone}</p>
                <p>Email: {shippingData.email}</p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-4 text-[#b99b77] hover:underline text-sm font-medium"
              >
                Edit Address
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg text-[#b99b77]">
                  ₹{Math.round(totalPrice + 200).toLocaleString('en-IN')}
                </span>
              </div>

              <Button
                onClick={() => setStep(4)}
                className="w-full bg-[#b99b77] text-white hover:bg-[#a88a66]"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Payment
  if (step === 4) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Payment</h1>
          <button
            onClick={() => setStep(3)}
            className="text-[#b99b77] hover:underline text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Select Payment Method</h2>

          <div className="space-y-4 mb-8">
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50" 
              style={{ borderColor: paymentMethod === 'card' ? '#b99b77' : '#e5e7eb' }}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Credit / Debit Card</p>
                <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
              style={{ borderColor: paymentMethod === 'upi' ? '#b99b77' : '#e5e7eb' }}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">UPI</p>
                <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
              style={{ borderColor: paymentMethod === 'wallet' ? '#b99b77' : '#e5e7eb' }}>
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Digital Wallet</p>
                <p className="text-sm text-gray-600">Paytm, MobiKwik, Amazon Pay</p>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
              style={{ borderColor: paymentMethod === 'cod' ? '#b99b77' : '#e5e7eb' }}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Cash on Delivery</p>
                <p className="text-sm text-gray-600">Pay when you receive your order</p>
              </div>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <Input placeholder="123" type="password" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <Input placeholder="yourname@upi" />
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Total</p>
            <p className="text-2xl font-semibold text-[#b99b77]">
              ₹{Math.round(totalPrice + 200).toLocaleString('en-IN')}
            </p>
          </div>

          <Button
            onClick={() => {
              // TODO: Integrate actual payment gateway (Razorpay, Stripe, etc.)
              alert(`Payment via ${paymentMethod.toUpperCase()} would be processed here.\nOrder placed successfully!`);
              clearCart();
              // Redirect to order confirmation
              window.location.href = '/';
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
          >
            Pay ₹{Math.round(totalPrice + 200).toLocaleString('en-IN')}
          </Button>
        </div>

        <p className="text-center text-xs text-gray-600">
          Your payment information is secure and encrypted
        </p>
      </div>
    );
  }
}
