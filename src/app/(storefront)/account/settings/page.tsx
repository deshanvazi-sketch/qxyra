'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-heading text-2xl md:text-3xl">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile, security, and preferences.</p>
      </div>

      {/* Profile Section */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="font-heading text-xl mb-4">Profile Information</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" defaultValue="John Doe" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" defaultValue="john.doe@example.com" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold" />
            </div>
          </div>
          <button type="submit" className="bg-brand-black text-brand-gold px-6 py-2 rounded hover:bg-gray-900 transition-colors font-medium text-sm">
            Save Profile
          </button>
        </form>
      </section>

      {/* Security Section */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="font-heading text-xl mb-4">Change Password</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold max-w-md" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold max-w-md" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-gold max-w-md" />
          </div>
          <button type="submit" className="bg-brand-black text-brand-gold px-6 py-2 rounded hover:bg-gray-900 transition-colors font-medium text-sm">
            Update Password
          </button>
        </form>
      </section>

      {/* Notifications Section */}
      <section className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="font-heading text-xl mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex items-center mt-1">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-black"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive order updates and shipping confirmations via email.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex items-center mt-1">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-black"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive text messages for delivery updates.</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex items-center mt-1">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-black"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Marketing Emails</p>
              <p className="text-sm text-gray-500">Receive exclusive offers, promotions, and news.</p>
            </div>
          </label>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h2 className="font-heading text-xl mb-2 text-red-700">Delete Account</h2>
        <p className="text-red-600 text-sm mb-4">
          Once you delete your account, there is no going back. Please be certain. All your data including order history will be permanently removed.
        </p>
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors font-medium text-sm">
          Delete My Account
        </button>
      </section>
    </div>
  );
}
