require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.options('*', cors());
app.use(helmet());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));


// Routes
console.log('Mounting /api/auth routes...');
app.use('/api/auth', require('./routes/auth'));

// Debug: List all registered routes
setTimeout(() => {
  console.log('Registered routes:', app._router.stack.filter(r => r.route).map(r => r.route.path));
}, 1000);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
