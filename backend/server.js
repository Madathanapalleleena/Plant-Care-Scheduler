const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
require('./db'); // Ensure DB connects on server start

// Middleware (should come before routes)
app.use(cors());
app.use(express.json()); // Important to parse incoming JSON requests

// Routes
const plantRoutes = require('./routes/Plant');
const careLogRoutes = require('./routes/CareLog');

app.use('/api/plants', plantRoutes);
app.use('/api/carelogs', careLogRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
