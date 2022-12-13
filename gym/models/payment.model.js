const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
	cardholderName: {
		type: String,
		require: true
	},
	fullName: {
		type: String
	},
	cardNumber: {
		type: Number
	},
	emailAddress: {
		type: String
	},
	city: {
		type: String
	},
	zipCode: {
		type: String
	}
});

module.exports = mongoose.model('Payment', PaymentSchema);
