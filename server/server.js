require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');

const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const apiAuthRoutes = require('./Routes/apiAuthRoutes');
const apiEmergencyRoutes = require('./Routes/apiEmergencyRoutes');
const apiAdoptRoutes = require('./Routes/apiAdoptRoutes');
const apiGivePetRoutes = require('./Routes/apiGivePetRoutes');

const cors = require('cors');

const emergencyUploadDir = path.join(__dirname, 'emergency-uploads');
const givePetUploadDir = path.join(__dirname, 'give-pet-uploads');
[emergencyUploadDir, givePetUploadDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const app = express();

const dbUnavailableMessage =
  'Database is not connected. Set mongooseURL in server/.env (MongoDB Atlas user, password, network access).';

const requireMongo = (req, res, next) => {
  const conn = mongoose.connection;
  if (conn.readyState === 1 && conn.db) {
    return next();
  }
  res.status(503).json({ error: dbUnavailableMessage });
};

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api-files/emergency', express.static(emergencyUploadDir));
app.use('/api-files/give-pet', express.static(givePetUploadDir));

app.use(requireMongo);
app.use('/api/auth', apiAuthRoutes);
app.use('/api/emergency', apiEmergencyRoutes);
app.use('/api/adopt', apiAdoptRoutes);
app.use('/api/give-pet', apiGivePetRoutes);

app.use(petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);

const PORT = process.env.PORT || 4000;

async function start() {
  const uri = process.env.mongooseURL;
  if (!uri) {
    console.error('Missing mongooseURL in server/.env');
  } else {
    try {
      await connectDB(uri);
      console.log('Connected to DB');
    } catch (err) {
      console.error('MongoDB connection failed:', err.message || err);
      console.error(dbUnavailableMessage);
    }
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

start();
