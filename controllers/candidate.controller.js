import { CustomError } from "../middlewares/errorHandler.js";
import { customResponse } from "../utils/cutomResponse.js";
import getAuthToken from "../utils/getAuthToken.js";

const users = [
  {
    _id: "fdhskfhkdhf1232jljflsjdf",
    email: "test.user@gmail.com",
    password: "test.user@123",
  },
];

export const candidateSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new CustomError(400, "Please fill out all required fields.");

    const user = users.find((u, i) => u.email == email);
    if (!user) throw new CustomError(404, "User not found.");

    const isPasswordValid = password === user.password;

    if (!isPasswordValid)
      throw new CustomError(
        401,
        "The password you have entered is incorrect. Please try again."
      );

    const authToken = getAuthToken(user._id, user.email);

    res.status(200).json(
      customResponse(true, "Login successful! Welcome", {
        token: authToken,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const candidateSignOut = async (req, res, next) => {
  try {
    res.status(200).json(customResponse(true, "Login successful! Welcome", {}));
  } catch (error) {
    next(error);
  }
};
