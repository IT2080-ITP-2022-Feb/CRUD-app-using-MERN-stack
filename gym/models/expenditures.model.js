const mongoose = require('mongoose');

const ExpendituresSchema = mongoose.Schema({
	voucherId: {
		type: String,
		require: true,
		unique: true
	},
	management: {
		type: String
	},
	value: {
		type: Number
	},
	type: {
		type: String
	}
});

module.exports = mongoose.model('Expenditures', ExpendituresSchema);
