import jwt from "jsonwebtoken";

//create acces token
export const generateAccessToken = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1000s",
  });
};

//create refresh token
export const generateRefreshToken = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn:"1d"
  })
};

//function for manage refresh Token in cookies
export const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    // secure: true, // Aktifkan jika menggunakan HTTPS
  });
};
