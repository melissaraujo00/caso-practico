const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipment.controller');

router.get('/', shipmentController.getShipments);
router.get('/:id', shipmentController.getShipmentById);
router.post('/', shipmentController.postShipment);
router.put('/:id', shipmentController.updateShipment );
router.put('/status/:id', shipmentController.updateShipmentStatus);
router.delete('/:id', shipmentController.deleteShipment);

module.exports = router;