import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config(); // Load environment variables

const require = createRequire(import.meta.url);
const serviceAccount = require(process.env.FIREBASE_ADMIN_KEY_PATH || './serviceAccountKey.json');

const app = express();
const port =  5500;

// Firebase Admin SDK initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://swoop-in-default-rtdb.firebaseio.com',
});

app.use(cors());
app.use(express.json());

// Registration route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  if (!email.endsWith('@emich.edu')) {
    return res.status(400).send('Email must end with @emich.edu.');
  }

  try {
    await admin.auth().getUserByEmail(email);
    return res.status(400).send('Email is already in use.');
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      return res.status(500).send('Error checking email.');
    }
  }

  try {
    const newUser = await admin.auth().createUser({ email, password });
    res.status(201).send(`User created with UID: ${newUser.uid}`);
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    if (userRecord) {
      return res.status(200).send('Login successful. Redirecting to main page...');
    } else {
      return res.status(401).send('Invalid credentials.');
    }
  } catch (error) {
    res.status(500).send(`Error logging in: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
