require('dotenv').config();
const cors = require('cors')
const express = require('express');
const connectDb = require('./database');
const userRoutes = require('./Routes/userRoutes');
const templateRoutes = require('./Routes/templateRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const errorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT || 3000;
const app = express();

connectDb();
app.use(cors());
app.get("/", (req, res) => {
    res.send("<h1 style='text-align:center;padding-top:250px'>Welcome to Cloud202</h1>");
})
app.use(express.json());

app.use(adminRoutes);
app.use('/api', userRoutes);
app.use('/api', templateRoutes);
// app.use(errorHandler);
// console.log(process.env.PORT);
app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})