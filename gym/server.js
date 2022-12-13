const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
//Connecting database into the system
require('dotenv').config();
//Environment variables

//Importing routes
const incomeRoutes = require('./routes/income.routes.js');
const expendituresRoutes = require('./routes/expenditures.routes.js');
const paymentRoutes = require('./routes/payment.routes.js');

const app = express();
app.use(cors());
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use('/api/income', incomeRoutes);
app.use('/api/expenditures', expendituresRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
