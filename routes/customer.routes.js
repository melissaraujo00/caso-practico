const express = require("express");
const router = express.Router();
const CustomerCtrl = require('../controllers/customer.controller');

router.get('/', CustomerCtrl.getCustomer);
router.post('/', CustomerCtrl.postCustomer);
router.put('/:id', CustomerCtrl.putCustomer);
router.delete('/:id', CustomerCtrl.deleteCustomer);

module.exports = router;