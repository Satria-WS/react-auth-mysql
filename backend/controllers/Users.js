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
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

// register
export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: 'password not match',
      });
    }
    const salt = await bcrypt.genSalt(); //"Salt" adalah string acak yang akan ditambahkan ke password sebelum dienkripsi
    const hashPassword = await bcrypt.hash(password, salt); // Password yang telah dienkripsi tidak bisa dikembalikan ke bentuk aslinya, sehingga lebih aman.

    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    return res.status(201).json({ msg: 'Register succesfull' });
  } catch (error) {
    console.log(error);
  }
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
      return res.status(400).json({ msg: 'Wrong Password' });
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
    console.log('Generated refresh token:', refreshToken);

    // Kirimkan Access Token sebagai respons
    res.json({ accessToken, msg: 'token succesfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Terjadi kesalahan, coba lagi nanti.' });
  }
};
