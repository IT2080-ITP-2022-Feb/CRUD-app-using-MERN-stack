const express = require('express');

const {
	createExpenditures,
	getExpendituress,
	getExpendituressByVoucherid,
	deleteExpenditures,
	updateExpenditures
} = require('../controllers/expenditures.controller.js');

const router = express.Router();

router.post('/', createExpenditures);
router.get('/', getExpendituress);
router.put('/', updateExpenditures);
router.get('/voucherId/:id', getExpendituressByVoucherid);
router.delete('/delete', deleteExpenditures);

module.exports = router;
