import Users from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res) => {
  try {
    // ambil refresh token yang  ada di cookie
    const refreshToken = req.cookies.refreshToken;
    //  cek refresh token jika tak ada maka status 401
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }

    //mencari user di database berdasarkan refreshToken ,
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    //mengecek user berdasarkan refresh token ,  jika tak ada maka status 403
    if (!user) {
      return res
        .status(403)
        .json({ message: 'User not found or invalid refresh token' });
    }

    // jwt.verify() , untuk mengecek token apakan refreshToken yg di terima itu valid atau expired
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return res
            .status(403)
            .json({ message: 'Invalid or expired refresh token' });
        }
        const { id: userId, name, email } = user;

        //jwt.sign , membuat access token baru dan berlaku hanya 15 detik
        //Kode ini digunakan untuk menghasilkan JSON Web Token (JWT) yang berisi informasi pengguna yang telah diverifikasi (seperti userId, name, dan email).
        const accessToken = jwt.sign(
          { userId, name, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '100s',
          },
        );
        res.status(200).json({ accessToken });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
