const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_LINK);
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

module.exports = connectDb;
