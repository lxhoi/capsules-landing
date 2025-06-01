// Vercel serverless function to handle booking form submissions
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, checkIn, checkOut, guests, message } = req.body;

    // Basic validation
    if (!name || !email || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Date validation
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return res.status(400).json({ error: 'Check-in date cannot be in the past' });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ error: 'Check-out date must be after check-in date' });
    }

    // Here you would typically:
    // 1. Send an email notification
    // 2. Store the booking in a database
    // 3. Integrate with a booking system
    // For now, we'll just log it and return success

    // Example: Log the booking (replace with your actual storage solution)
    console.log('New booking received:', {
      name,
      email,
      checkIn,
      checkOut,
      guests,
      message,
      timestamp: new Date().toISOString()
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Booking request received successfully'
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
} 