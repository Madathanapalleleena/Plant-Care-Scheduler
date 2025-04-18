const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // Extract token from the 'Authorization' header
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Authentication required: No token provided' });
    }
  
    try {
      // Verify the token using the secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Debugging: Log the decoded token to see if it contains the userId
      console.log('Decoded Token:', decoded);
  
      // Ensure the decoded token has the 'userId' field
      if (!decoded || !decoded.userId) {
        console.log('Invalid token structure, missing userId');
        return res.status(401).json({ message: 'Invalid token structure' });
      }
  
      // Attach the userId to the request object to be used in subsequent routes
      req.userId = decoded.userId;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error('Error verifying token:', err); // Optional logging for debugging
      res.status(401).json({ message: 'Invalid token or token expired' });
    }
  };
  

module.exports = authenticate;

