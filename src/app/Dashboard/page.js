'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ import this

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ use this for routing

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/get_messages');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
 <div className="p-6 max-w-4xl mx-auto">
  <h1 className="text-3xl font-extrabold mb-6 text-white-800 border-b pb-2">
     Admin Dashboard
  </h1>

  {loading ? (
    <div className="text-blue-500 animate-pulse text-lg">Loading messages...</div>
  ) : messages.length === 0 ? (
    <p className="text-gray-500 italic">No messages found.</p>
  ) : (
    <ul className="space-y-6">
      {messages.map((msg) => (
        <li
          key={msg._id}
          className="relative border border-gray-200 rounded-xl shadow-md bg-white p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold text-gray-700">
                📧 {msg.name}
              </p>
              <p className="text-sm text-blue-600">{msg.email}</p>
            </div>
            <button
              onClick={() => handleDelete(msg._id)} // Add your delete logic here
              className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1 rounded-full text-sm transition-all"
              title="Delete Message"
            >
              🗑️ Delete
            </button>
          </div>

          <p className="mt-3 text-gray-600">{msg.message}</p>
          <p className="text-sm text-gray-400 mt-4">
            🕒 {new Date(msg.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  )}

  <div className="mt-10 text-right">
    <button
      onClick={() => {
        localStorage.removeItem('adminAuth');
        router.push('/login');
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md transition-all"
    >
      🚪 Logout
    </button>
  </div>
</div>


  );
}
