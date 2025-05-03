const express = require('express');
const cors = require('cors');
const app = express();

const RESEND_API_KEY = 're_6WNJmQeM_KKEXX8J1GXtc68MvEF47ahLi';

app.use(cors({
  origin: 'http://localhost:8080' // Dein Frontend
}));
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to,
        subject,
        text,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 