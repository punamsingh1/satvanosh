
// pages/api/contact.js
import dbConnect from '../../lib/mongoose';
import Contact from '../../models/Contact';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
  await dbConnect();
  const { name, email, message } = req.body;

  console.log("Received:", req.body);

  const contact = await Contact.create({ name, email, message });
  console.log("Saved to DB:", contact);

  res.status(200).json({ success: true });
} catch (error) {
  console.error("DB Error:", error.message);
  res.status(500).json({ error: 'Database error', message: error.message });
}

  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
