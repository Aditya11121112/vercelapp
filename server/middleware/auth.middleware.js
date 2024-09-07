import jwt from 'jsonwebtoken';

const validate_token = async (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
  if (!token) {
    return res.status(401).json({ message: 'Token not available', data: null });
  }

  try {
    // Verify the token
    const decoded = await jwt.verify(token, 'adi');
    console.log('Data decoded:', decoded); // Logging the decoded data
    return res.json({
      message: 'Authorized User',
      data: decoded, // Use `decoded` directly as it holds the decoded information
    });
  } catch (err) {
    // Handle error scenario when token is invalid or expired
    return res.status(401).json({
      message: 'Error in Authorized token',
      data: null,
      error: err.message,
    });
  }
};

export { validate_token };
