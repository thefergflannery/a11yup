const express = require('express');
const cors = require('cors');
const path = require('path');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mailchimp configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
});

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed'
    });

    return res.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    return res.status(500).json({ 
      error: 'Failed to subscribe. Please try again later.',
      details: error.response?.body || error.message || 'Unknown error'
    });
  }
});

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 