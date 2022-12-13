const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DATABASE_URL;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('MongoDB Connection is up and running');
	} catch (err) {
		console.log(err);
		console.error(err.message);
		process.exit(1);
	}
};
module.exports = connectDB;
