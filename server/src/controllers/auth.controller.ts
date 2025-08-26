import { Request, Response } from 'express';
import User from '../models/User';
import { signToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  const { aadhaar, name, username, mobile, password, role, email } = req.body;
  if (!/^\d{12}$/.test(aadhaar)) return res.status(400).json({ error: 'Invalid Aadhaar number' });
  if (!/^(?:\+?91)?[6-9]\d{9}$/.test(mobile)) return res.status(400).json({ error: 'Invalid mobile number' });
  if (!password || password.length < 8) return res.status(400).json({ error: 'Password too short' });
  try {
    let user = await User.findOne({ aadhaar });
    if (user) return res.status(409).json({ error: 'Aadhaar already registered' });
    // Only allow Admin to create Admin/Worker
    if ((role === 'Admin' || role === 'Worker') && req.user?.role !== 'Admin') {
      return res.status(403).json({ error: 'Only Admin can create Admin/Worker' });
    }
  user = new User({ aadhaar, name, username, mobile, password, role: role || 'Citizen', email });
    await user.save();
    const token = signToken(user._id, user.role);
    res.status(201).json({ message: 'Registered', user: { id: user._id, name: user.name, role: user.role }, token });
  } catch (err: any) {
    console.error('Registration error:', err);
    // Handle duplicate username error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      return res.status(409).json({ error: 'Username already taken' });
    }
    if (err instanceof Error) {
      res.status(500).json({ error: 'Server error', details: err.message });
    } else {
      res.status(500).json({ error: 'Server error', details: err });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, aadhaar, password } = req.body;
  try {
    // Try to find user by username or aadhaar
    const user = await User.findOne({ $or: [
      username ? { username } : {},
      aadhaar ? { aadhaar } : {}
    ] });
    if (!user) {
      console.error('Login error: User not found for', { username, aadhaar });
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('Login debug:', {
      enteredPassword: password,
      storedHash: user.password
    });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.error('Login error: Password mismatch for user', user.username || user.aadhaar);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signToken(user._id, user.role);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        profilePhoto: user.profilePhoto || ""
      }
    });
  } catch (err) {
    console.error('Login server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const me = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ user: req.user });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};
