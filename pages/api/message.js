import dbConnect from '../../lib/mongoose';
import Contact from '../../models/Contact';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const messages = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching messages' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
