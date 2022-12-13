const mongoose = require('mongoose');

const IncomeSchema = mongoose.Schema({
	recieptId: {
		type: String,
		require: true,
		unique: true
	},
	management: {
		type: String
	},
	type: {
		type: String
	},
	value: {
		type: Number
	}
});

module.exports = mongoose.model('Income', IncomeSchema);
