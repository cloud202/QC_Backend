const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://cloud202:cdhOpo4xFzASqVwJ@cluster0.53zlufx.mongodb.net/?retryWrites=true&w=majority');
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

module.exports = connectDb;
