// BEST PRACTICE: Import at the top level of the module.
// This ensures the library is loaded only once.
  const jwt = require('jsonwebtoken');

  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      // 401 Unauthorized is more appropriate for missing credentials.
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // added this JWT for working properly
    try {
      // BEST PRACTICE: Use a try...catch block for synchronous errors like verification.
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        // SECURITY: Explicitly specify the algorithm you used to sign the token.
        algorithms: ['HS256'] 
      });

      // Attach the decoded payload to the request object.
      req.user = decoded;
      next();
    } catch (err) {
      // More specific error handling.
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Access denied. Token has expired.' });
      }
      // For other errors (e.g., malformed token, invalid signature)
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  module.exports = authenticateToken;