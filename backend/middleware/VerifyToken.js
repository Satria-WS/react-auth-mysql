import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res
        .sendStatus(401)
        .json({ msg: 'Authorization token is missing or wrong' });
    }
    const token = authHeader.split(' ')[1];

    // Verify token asynchronously
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res
          .sendStatus(403)
          .json({ msg: 'Forbidden: Invalid or expired token' });
      }

      req.email = decoded.email;
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        msg: 'Forbidden: An unexpected error occurred while verifying the token',
      });
  }
};
