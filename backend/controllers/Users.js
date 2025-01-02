import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: "password not match",
    });
  }
  const salt = await bcrypt.genSalt(); //"Salt" adalah string acak yang akan ditambahkan ke password sebelum dienkripsi
  const hashPassword = await bcrypt.hash(password, salt); // Password yang telah dienkripsi tidak bisa dikembalikan ke bentuk aslinya, sehingga lebih aman.
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    return res.status(201).json({ msg: "Register succesfull" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    // console.log('user?', user[0].id);
    // console.log('match?' , match);

    if (!match) {
      return res.status(400).json({ mesg: "Wrong Password" });
    }
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure:true
    });
    res.json({ accessToken });
    await Users.update({refresh_token:refreshToken})
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};
