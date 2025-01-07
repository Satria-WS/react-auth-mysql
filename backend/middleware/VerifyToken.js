import jwt from 'jsonwebtoken';
import Users from '../models/UserModel.js';
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res
        .status(401)
        .json({ msg: 'Authorization token is missing or wrong' });
    }
    const token = authHeader.split(' ')[1];

    // Verify token asynchronously
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          return res
            .status(403)
            .json({ msg: 'Forbidden: Invalid or expired token' });
        }

        // Check if the user's refresh token is null
        const user = await Users.findOne({ where: { id: decoded.userId } });
        if (!user || !user.refresh_token) {
          return res.status(403).json({ msg: 'Forbidden: User is logged out' });
        }

        // req.email = decoded.email;
        next(); // Proceed to the next middleware or route handler
      },
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Forbidden: An unexpected error occurred while verifying the token',
    });
  }
};
