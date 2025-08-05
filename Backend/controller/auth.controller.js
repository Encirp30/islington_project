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
