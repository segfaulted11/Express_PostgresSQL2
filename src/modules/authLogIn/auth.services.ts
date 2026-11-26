import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const logInUserIntoDB = async (payLoad: {
  email: string;
  password: string;
}) => {
  /* check if the user exists then if the password matches, check the user status, if all is passed then generate the jwt token. */
  const { email, password } = payLoad;

  //check if the user exists in the 'users' db
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  // console.log(user.rows[0]); //returns the user's data from the users table in an object that matches w the email.
  if (user.rowCount === 0) {
    throw new Error("User doesnt exist");
  }
  //check if the user got the password right
  const hashedPass = user.rows[0].password;
  const passMatch = await bcrypt.compare(password, hashedPass);
  if (!passMatch) {
    throw new Error("password is wrong!");
  }
  //check the user status
  const isActive = user.rows[0].is_active;
  if (!isActive) {
    throw new Error("user is not active therefore access denied!");
  }
  // since all chekced, now generate the token ->
  const { id, name, email: userEmail, role } = user.rows[0];
  const jwtPayload = {
    id: id,
    name: name,
    email: userEmail,
    role: role,
  };
  // console.log(user.rows[0])
  //access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret_token, {
    expiresIn: "1h",
  });

  //refresh token
  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_token, {
    expiresIn: "10d",
  });
  const use_r = user.rows[0];
  delete use_r.password;
  return { accessToken, refreshToken, user: use_r };
};

const generateAccessToken = async (token: string) => {
  if (!token) {
    throw new Error("unauthorized access");
  }
  const decode = jwt.verify(
    token as string,
    config.jwt_refresh_token,
  ) as JwtPayload;
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [decode.email],
  );
  //check if user exists
  if (user.rowCount === 0) {
    throw new Error("user not found!");
  }
  //checking if user is active
  if (!user.rows[0].is_active) {
    throw new Error("forbidden!");
  }
  //....
    const { id, name, email: userEmail, role } = user.rows[0];
    const jwtPayload = {
    id: id,
    name: name,
    email: userEmail,
    role: role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret_token, {
    expiresIn: "1h",
  });
  return {accessToken};
};

export const authServices = {
  logInUserIntoDB,
  generateAccessToken,
};
