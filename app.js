import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import newsRoutes from './routes/news.js';
import { isAuthenticated } from './middlewares/auth.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { JWT_SECRET, JWT_COOKIE_EXPIRE, JWT_EXPIRES_IN, MONGO_URI } from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, 'config/.env') });

const app = express();
const PORT = 3000;

//Connection to Mongo DB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.use('/news',isAuthenticated, newsRoutes);
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html')); // assume static file
});

// To register the user
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views/register.html')));
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed });
    res.redirect('/login');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Username:', username);

  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    console.log('User not found');
    return res.redirect('/login?error=1');
  }
  console.log('User from DB:', user);
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    console.log('Invalid password');
    return res.redirect('/login?error=1');
  }

  const token = jwt.sign({ userID: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false
  });
  res.redirect('/');
});

app.get('/status', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.userID).select('username');
  if (!user) return res.status(401).json({ authenticated: false });
  res.json({ authenticated: true, username: user.username });
});

app.get('/logout', (req, res) => {
  res.clearCookie("jwt");
  res.redirect('/login');
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
