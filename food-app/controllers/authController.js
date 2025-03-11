const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address ,answer} = req.body;

        // Validation
        if (!userName || !email || !password || !address || !phone|| !answer) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }



        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already registered, please login",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        });

        res.status(201).send({
            success: true,
            message: "Successfully registered",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};

// Login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Hide password in response
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        });
    }
};

module.exports = { registerController, loginController };
