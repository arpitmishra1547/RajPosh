'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function AccountPage() {
  const { user, isLoaded, isLoading, login, register, logout, updateProfile } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  // User is logged in - show profile
  if (user) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-900">My Account</h1>
            <Button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-700">
              {success}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-lg font-medium text-gray-900">{user.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-medium text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-medium text-gray-900">{user.phone || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="text-lg font-medium text-gray-900">{user.city || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">State</p>
                  <p className="text-lg font-medium text-gray-900">{user.state || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pincode</p>
                  <p className="text-lg font-medium text-gray-900">{user.pincode || 'Not set'}</p>
                </div>
              </div>

              {user.address && (
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-lg font-medium text-gray-900">{user.address}</p>
                </div>
              )}

              <Button
                onClick={() => {
                  setIsEditing(true);
                  setFormData({ ...user, password: '' });
                }}
                className="bg-[#b99b77] text-white hover:bg-[#a88a66]"
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <Input
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="Pincode"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={async () => {
                    try {
                      setError('');
                      setSuccess('');
                      await updateProfile(formData);
                      setSuccess('Profile updated successfully!');
                      setIsEditing(false);
                    } catch (err) {
                      setError(err.message);
                    }
                  }}
                  disabled={isLoading}
                  className="bg-[#b99b77] text-white hover:bg-[#a88a66]"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // User not logged in - show login/register
  return (
    <div className="container mx-auto px-4 py-8 mt-24 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          {isLoginMode ? 'Login' : 'Register'}
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Full Name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
            />
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone (Optional)
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone Number"
              />
            </div>
          )}

          <Button
            onClick={async () => {
              try {
                setError('');
                if (isLoginMode) {
                  await login(formData.email, formData.password);
                } else {
                  await register(
                    formData.fullName,
                    formData.email,
                    formData.password,
                    formData.phone
                  );
                }
              } catch (err) {
                setError(err.message);
              }
            }}
            disabled={isLoading}
            className="w-full bg-[#b99b77] text-white hover:bg-[#a88a66]"
          >
            {isLoading ? 'Loading...' : isLoginMode ? 'Login' : 'Register'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
                setFormData({
                  email: '',
                  password: '',
                  fullName: '',
                  phone: '',
                  address: '',
                  city: '',
                  state: '',
                  pincode: '',
                });
              }}
              className="text-[#b99b77] hover:underline font-medium"
            >
              {isLoginMode ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
