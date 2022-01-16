import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: true }));

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ username: username });
    if (user) throw Error('Username already taken');
    console.log('after user');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const isAuthorized = (req, res, next) => {
  const token = req.cookies.token;

  //check if token exists
  if (!token) {
    return res.status(401).send('No token found, authorization denied');
  }

  try {
    //verify token
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedJWT;
    next();
  } catch (e) {
    res.clearCookie('token');
    res.status(400).send(e.message);
  }
};

app.post('/protected', isAuthorized, (req, res) => {
  res.send('authorized yay!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter your credentials' });
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) throw Error('User does not exist');

    const isAuthenticated = user.authenticateUser(password);
    if (!isAuthenticated) throw Error('Invalid credentials');

    const token = user.generateAuthToken();
    console.log(token);

    res
      .cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 900000),
      })
      .send(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

app.get('/routines', isAuthorized, async (req, res) => {
  const token = jwt.decode(req.cookies.token);
  try {
    const user = await User.findById(token._id);
    res.send(user.routines);
  } catch (e) {
    console.log(e);
  }
});
