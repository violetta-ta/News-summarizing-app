
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(403).json({ error: "Please login to get access" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.userID = decoded.userID;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Invalid token" });
  }
};

