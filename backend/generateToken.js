const jwt = require('jsonwebtoken');

const payload = {
  userId: '5', // Replace with your actual user ID or other data
};

const secretKey = 'your-secret-key'; // Replace with your secret key (keep this private)
const options = { expiresIn: '1h' }; // Set the expiration time for the token, e.g., 1 hour

// Generate the JWT token
const token = jwt.sign(payload, secretKey, options);
console.log('Generated JWT Token:', token);
