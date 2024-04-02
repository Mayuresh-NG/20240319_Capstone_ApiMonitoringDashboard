// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../models/userSchema");
const { validateInputs } = require("../validators/user_details_validation");

/** Signs up a new user with the provided data.
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} JSON with success, message, and user properties.
 */
const signup = async (req, res) => {
  try {
    const userData = req.body;

    // Validate user data
    const validationError = validateInputs(userData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Check if the user already exists with the provided email or phone number
    const existingUser = await User.findOne({
      email: userData.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account already exists with the provided email.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Create a new user
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**Logs in a user with the provided email and password.
 * @param {Object} req - The request object containing email and password.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} JSON with success, message, token, and user properties.
 */
const login = async (req, res) => {
  try {
    const userData = req.body;
    const email = userData.email;
    const password = userData.password;

    // Validate user inputs
    const validationError = validateInputs(userData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Find the user by username
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // If the password is valid, generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**Retrieves user information based on the provided decoded token.
 * @param {Object} req - The request object containing decoded token.
 * @param {Object} res - The response object to send the user information.
 * @returns {Object} JSON with the user information.
 */
const info = async (req, res) => {
  try {
    const decodedToken = req.decoded;

    const userExist = await User.findOne({ email: decodedToken.email });

    if (!userExist) {
      return res.status(404).send({ error: "User not Found." });
    }

    if (!(decodedToken.email === userExist.email)) {
      return res.status(401).send({ error: "Sorry, you're not Authorized." });
    }

    return res.status(200).send(userExist);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Failed to retrieve data." });
  }
};

module.exports = {
  signup,
  login,
  info,
};
