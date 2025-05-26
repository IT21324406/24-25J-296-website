const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Store messages in memory (in a real application, you'd use a database)
const messages = [];

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Validate the input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Store the message
    const newMessage = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    // In a real application, you might want to:
    // 1. Save to a database
    // 2. Send an email notification
    // 3. Integrate with a CRM system
    
    res.status(201).json({ 
        success: true, 
        message: 'Message received successfully',
        data: newMessage
    });
});

// Get all messages endpoint (for admin purposes)
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 