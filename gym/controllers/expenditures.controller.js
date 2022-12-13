const ExpendituresModel = require('../models/expenditures.model');

const createExpenditures = async (req, res, next) => {
	const { voucherId, management, value, type } = req.body;
	try {
		let expenditures = await ExpendituresModel.find({
			$or: [
				{
					voucherId: voucherId
				}
			]
		});

		if (expenditures.length > 0) {
			return res.status(400).json({
				message:
					'There is an onther instance of expenditures, using either voucherId of unique fields. Please recheck and try again'
			});
		}

		const new_expenditures = new ExpendituresModel({
			voucherId,
			management,
			value,
			type
		});

		await new_expenditures.save();

		return res.status(201).json({
			message: 'expenditures instance created successfully',
			expenditures: new_expenditures
		});
	} catch (err) {
		return res.status(500).json({
			message:
				'Server error occured while creating Expenditures, Please try again'
		});
	}
};

const getExpendituress = async (req, res, next) => {
	try {
		const expendituress = await ExpendituresModel.find();

		if (expendituress.length == 0) {
			return res.status(404).json({
				message: 'No Expendituress found yet'
			});
		}

		return res.status(200).json({
			message: 'Expendituress found',
			expendituress
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong in the server. Please try again'
		});
	}
};

const getExpendituressByVoucherid = async (req, res, next) => {
	const id = req.params.id;
	try {
		const expenditures = await ExpendituresModel.findOne({
			voucherId: id
		});

		if (!expenditures) {
			return res.status(404).json({
				message:
					'No expenditures found for the voucherId, please re-check and try again`'
			});
		}

		return res.status(200).json({
			message: 'Expenditures found',
			expenditures
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong in the server. Please try again'
		});
	}
};

const deleteExpenditures = async (req, res, next) => {
	const { id } = req.body;
	try {
		await ExpendituresModel.deleteOne({ _id: id });

		return res.status(200).json({
			message: 'Successfully deleted the Expenditures'
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong in the server. Please try again'
		});
	}
};

const updateExpenditures = async (req, res, next) => {
	try {
		let expenditures = await ExpendituresModel.findOne({
			recieptId: req.params.recieptId
		});
		if (!expenditures) {
			return res
				.status(404)
				.json({ message: 'Cannot find a document related to this id' });
		}
		expenditures.management = req.body.management;
		expenditures.type = req.body.type;
		expenditures.value = req.body.value;

		await expenditures.save();

		return res
			.status(200)
			.json({ message: 'Expendexpenditures updated', expenditures });
	} catch (err) {
		return res.status(500).json({ msg: err });
	}
};

exports.createExpenditures = createExpenditures;
exports.getExpendituress = getExpendituress;
exports.getExpendituressByVoucherid = getExpendituressByVoucherid;
exports.deleteExpenditures = deleteExpenditures;
exports.updateExpenditures = updateExpenditures;
