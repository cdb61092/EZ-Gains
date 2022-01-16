import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'loginsystem',
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      'INSERT INTO users (username, password) VALUES (?,?)',
      [username, hash],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            res.send('An account with this username already exists.');
          } else {
            res.send({ err: err });
          }
        } else {
          res.send({ result: result });
        }
      }
    );
  });
});

const isAuthorized = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('No token found, authorization denied');
  }

  try {
    //verify token
    const decodedJWT = jwt.verify(token, 'superSecret');
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

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id; // user id from db
            const token = jwt.sign({ id }, 'superSecret', {
              expiresIn: 1800,
            });

            res
              .cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 900000),
              })
              .send(result[0]);
          } else {
            res.send({ message: 'Wrong username / password combination!' });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.get('/getWorkouts', isAuthorized, (req, res) => {
  const token = req.cookies.token;
  const id = jwt.decode(token, 'superSecret').id;

  db.query('SELECT * FROM routines WHERE UserID = ?', id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      let routines = result;
      console.log(routines);
    }
  });
});

app.listen(3001, () => {
  console.log('running server');
});
