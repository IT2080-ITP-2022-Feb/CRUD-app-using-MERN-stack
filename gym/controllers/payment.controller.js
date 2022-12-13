const paymentModel = require('../models/payment.model');

const createPayment = async (req, res, next) => {
	try {
		const {
			cardholderName,
			fullName,
			cardNumber,
			emailAddress,
			city,
			zipCode
		} = req.body;

		const payment = new paymentModel({
			cardholderName,
			fullName,
			cardNumber,
			emailAddress,
			city,
			zipCode
		});

		await payment.save();

		return res.status(201).json({
			message: 'Payment instance created successfully',
			payment
		});
	} catch (err) {
		return res.status(500).json({ msg: err });
	}
};

exports.createPayment = createPayment;
