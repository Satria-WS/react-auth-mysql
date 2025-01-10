import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} from '../services/tokenService.js';

// getAlluser
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      // attributes: ['id', 'name', 'email', 'refresh_token'],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

// register

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    // Validate required fields
    // if (!email || !password || !confirmPassword) {
    //   return res.status(400).json({
    //     errors: {
    //       email: !email ? 'Email is required' : null,
    //       password: !password ? 'Password is required' : null,
    //       confirmPassword: !confirmPassword
    //         ? 'Confirm password is required'
    //         : null,
    //     },
    //   });
    // }

    // Check if all required fields are provided
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        msg: 'All fields are required',
      });
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: 'Passwords do not match',
      });
    }

    // Check if email is already in use
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        msg: 'Email is already in use',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    return res.status(201).json({ msg: 'Registration successfulX' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Server error',
    });
  }
};

const setRefreshTokenCookiex = (res, refreshToken) => {
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    // secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
    maxAge: 30 * 24 * 60 * 60 * 1000, // Set cookie expiration (e.g., 30 days)
    sameSite: 'Strict', // Prevent CSRF attacks
  });
};
// login
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await Users.findOne({ where: { email } });
    // console.log(user);

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).json({ msg: 'Email tidak ditemukan' });
    }

    // Bandingkan password yang dimasukkan dengan password yang ada di database
    const match = await bcrypt.compare(password, user.password);

    // Jika password tidak cocok
    if (!match) {
      return res.status(400).json({ msg: 'Email or password is wrong' });
    }

    // Siapkan data untuk token , access object user from userModel
    const { id: userId, name, email: userEmail } = user;

    // Generate Access Token
    const accessToken = generateAccessToken(userId, name, userEmail);
    // Generate Refresh Token
    const refreshToken = generateRefreshToken(userId, name, userEmail);

    // Update refresh token di database
    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: userId } },
    );

    // Set refresh token di cookies
    setRefreshTokenCookie(res, refreshToken);
    // setRefreshTokenCookiex(res, refreshToken);  // Call the function to set cookie
 
    // console.log('Generated refresh token:', refreshToken);

    // Kirimkan Access Token sebagai respons
    res.json({ accessToken, msg: 'token succesfully', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Terjadi kesalahan, coba lagi nanti.' });
  }
};

// logout
// Setelah logout, refreshToken dihapus baik dari cookie di browser pengguna maupun dari database, memastikan bahwa token yang sudah digunakan tidak bisa digunakan lagi
export const Logout = async (req, res) => {
  try {
    // Ambil refreshToken dari cookie
    const refreshToken = req.cookies.refreshToken;

    // Jika refreshToken tidak ada, respons dengan status 204 (No Content)
    if (!refreshToken) {
      return res.status(204).json({ message: 'No refresh token found' });
    }

    // Cari user berdasarkan refreshToken
    const user = await Users.findOne({
      where: { refresh_token: refreshToken },
    });

    // Jika user tidak ditemukan, respons dengan status 204 (No Content)
    if (!user) {
      return res
        .status(204)
        .json({ message: 'User not found or invalid refresh token' });
    }

    // Ambil id pengguna dan update refresh_token menjadi null di database
    const { id: userId } = user;
    await Users.update({ refresh_token: null }, { where: { id: userId } });

    // Hapus refresh token di cookie browser
    res.clearCookie('refreshToken');

    // Kirim respons sukses dengan status 200
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await Users.findOne({ where: { id: userId } });

    // If user not found, respond with status 404 (Not Found)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user from database
    await Users.destroy({ where: { id: userId } });

    // Respond with success status 200
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// delete all users
export const deleteAllUsers = async (req, res) => {
  try {
    // Delete all users from database
    await Users.destroy({ where: {}, truncate: true });

    // Respond with success status 200
    return res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
