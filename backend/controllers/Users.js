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
  const hashPassword = await bcrypt.hash(password, salt);// Password yang telah dienkripsi tidak bisa dikembalikan ke bentuk aslinya, sehingga lebih aman.
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
