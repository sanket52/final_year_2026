const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

async function connectDB(uri) {
  if (!uri) {
    throw new Error('mongooseURL is not set in .env');
  }
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000
  });
}

module.exports = { connectDB, mongoose };
