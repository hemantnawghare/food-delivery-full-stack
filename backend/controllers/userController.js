import userModel from '../models/userModal.js'; // Use PascalCase for the model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user (you can add logic here as needed)
const loginUser = async (req, resp) => { 
    // Login logic here
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return resp.json({success:false,message: "User Doesn't exit"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return resp.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        resp.json({success:true,token})
    } catch (error) {
        console.log(error)
        resp.json({success:false,message:"Error"})
    }
};

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret not found");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET); // Optional: add expiration
};

// register user
const registerUser = async (req, resp) => {
    const { name, password, email } = req.body;

    try {
        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return resp.status(409).json({ success: false, message: "User Already Exists" });
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return resp.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return resp.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        // hashing user Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        resp.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error);
        resp.status(500).json({ success: false, message: "Server Error" });
    }
};

export { loginUser, registerUser };
