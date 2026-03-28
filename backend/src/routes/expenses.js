const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expensesController');

router.get('/', expenseController.getAll);
router.post('/', expenseController.create);
router.delete('/:id', expenseController.remove);

module.exports = router;

