import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Register user
export async function register(req, res) {
    try {
        const { username, password } = req.body;

        const existing = await User.findOne({ username });
        if (existing) return res.status(400).send({ message: 'username already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'user registered successfully' });
    } catch (e) {
        return res.status(500).send(e);
    }
}

// Login user
export async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successfully", user, token });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

// Get all users
export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).send(e);
    }
}

// NEW: Search users (backend-based search)
export async function searchUsers(req, res) {
    const { q } = req.query;
    try {
        const users = await User.find({
            username: { $regex: q || '', $options: 'i' }  
        });
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: 'Search failed', error: e.message });
    }
}

// profile
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // set in authMiddleware
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get user by ID for profile viewing
export async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optionally add random dummy data here, if not stored in DB
    const extendedUser = {
      ...user.toObject(),
      phone: user.phone || "123-456-7890",
      address: user.address || "123, Sample Street",
    };

    res.status(200).json(extendedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

