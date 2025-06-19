'use client';

import { useState } from 'react';

export default function HomePage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // <-- this is required
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('Error sending message.');
    }
  };

  return (

    
    <main className="min-h-screen bg-neutral-50 text-gray-800">
      {/* Hero Section */}
      
      <section className="text-center py-20 bg-gradient-to-r from-blue-100 to-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to SatvaNosh Solutions</h1>
        <p className="text-lg mb-6">Modern, powerful, and scalable web app solutions.</p>
        <img src="/images/logo.png" alt="App Preview" className="mx-auto w-69 rounded-full shadow-2xl" />
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Fast Performance</h3>
            <p>Optimized with Next.js and Tailwind for lightning speed.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
            <p>Looks great on desktop, tablet, and mobile devices.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Database Ready</h3>
            <p>Integrated MongoDB for storing and retrieving user data.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <div className="max-w-4xl mx-auto text-center text-lg">
          Turning bold ideas into seamless, high-performance web applications that engage, inspire, and deliver results.        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          ></textarea>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
          {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 bg-white border-t">
        © {new Date().getFullYear()} SatvaNosh. All rights reserved.
      </footer>
    </main>
  );
}
