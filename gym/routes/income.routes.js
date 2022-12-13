const express = require('express');

const {
	createIncome,
	getIncomes,
	getIncomesByRecieptid,
	deleteIncome,
	updateIncome
} = require('../controllers/income.controller.js');

const router = express.Router();

router.post('/', createIncome);
router.get('/', getIncomes);
router.put('/', updateIncome);
router.get('/recieptId/:id', getIncomesByRecieptid);
router.delete('/delete', deleteIncome);

module.exports = router;
