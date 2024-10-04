const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


const serviceAccount = require(process.env.FIREBASE_ADMIN_KEY_PATH || './serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://swoop-in-default-rtdb.firebaseio.com',
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
