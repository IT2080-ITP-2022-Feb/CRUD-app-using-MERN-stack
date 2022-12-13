const Income = require('../models/income.model');

const createIncome = async (req, res, next) => {
	const { recieptId, management, type, value } = req.body;
	try {
		let old_income = await Income.find({
			$or: [
				{
					recieptId: recieptId
				}
			]
		});

		if (old_income.length > 0) {
			return res.status(400).json({
				message:
					'There is an onther instance of income, using either recieptId of unique fields. Please recheck and try again'
			});
		}

		const income = new Income({
			recieptId,
			management,
			type,
			value
		});

		await income.save();

		return res.status(201).json({
			message: 'income instance created successfully',
			income
		});
	} catch (err) {
		return res.status(500).json({
			message:
				'Server error occured while creating Income, Please try again'
		});
	}
};

const getIncomes = async (req, res, next) => {
	try {
		const incomes = await Income.find();

		if (incomes.length == 0) {
			return res.status(404).json({
				message: 'No Incomes found yet'
			});
		}

		return res.status(200).json({
			message: 'Incomes found',
			incomes
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong in the server. Please try again'
		});
	}
};

const getIncomesByRecieptid = async (req, res, next) => {
	const id = req.params.id;
	try {
		const income = await Income.findOne({
			recieptId: id
		});

		if (!income) {
			return res.status(404).json({
				message:
					'No income found for the recieptId, please re-check and try again`'
			});
		}

		return res.status(200).json({
			message: 'Income found',
			income
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong in the server. Please try again'
		});
	}
};

const deleteIncome = async (req, res, next) => {
	const { id } = req.body;
	try {
		await Income.deleteOne({ _id: id });

		return res.status(200).json({
			message: 'Successfully deleted the Income'
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Something went wrong in the server. Please try again'
		});
	}
};

const updateIncome = async (req, res, next) => {
	try {
		let income = await Income.findOne({ recieptId: req.body.recieptId });
		if (!income) {
			return res
				.status(404)
				.json({ message: 'Cannot find a document related to this id' });
		}
		income.management = req.body.management;
		income.type = req.body.type;
		income.value = req.body.value;

		await income.save();

		return res.status(200).json({ message: 'Income updated', income });
	} catch (err) {
		return res.status(500).json({ msg: err });
	}
};

exports.createIncome = createIncome;
exports.getIncomes = getIncomes;
exports.getIncomesByRecieptid = getIncomesByRecieptid;
exports.deleteIncome = deleteIncome;
exports.updateIncome = updateIncome;
