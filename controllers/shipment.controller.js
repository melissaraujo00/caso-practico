const Shipment = require("../models/shipment");
const Route = require("../models/route");

exports.getShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find()
            .populate('customer_id', 'name DUI telephoneNumber')
            .populate('route_id', 'name driver_id');
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id)
            .populate('customer_id')
            .populate('route_id');
        if (!shipment) {
            return res.status(404).json({ error: "Envío no encontrado" });
        }
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.postShipment = async (req, res) => {
    try {
        const shipment = await Shipment.create(req.body);
        res.status(201).json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateShipmentStatus = async (req, res) => {
    try {
        const { status, location, comments } = req.body;
        const shipment = await Shipment.findById(req.params.id);
        
        if (!shipment) {
            return res.status(404).json({ error: "Envío no encontrado" });
        }

        // Validar cancelación - solo si está pendiente
        if (status === "cancelado" && shipment.packageStatus !== "pendiente") {
            return res.status(400).json({ 
                error: "Solo se pueden cancelar envíos en estado 'pendiente'" 
            });
        }

        // Agregar al historial
        shipment.shippingHistory.push({
            location,
            comments: `Estado cambiado a: ${status}. ${comments || ''}`
        });

        shipment.packageStatus = status;
        if (status === "cancelado") {
            shipment.isCancelled = true;
        }

        await shipment.save();
        res.json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateShipment = async (req, res) => {
    try {        
        const shipment = await Shipment.findById(req.params.id);
        
        if (!shipment) {
            return res.status(404).json({ error: "Envío no encontrado" });
        }

        const updates = req.body;
        
        if (updates.destinationAddress) {
            shipment.destinationAddress = {
                ...shipment.destinationAddress,
                ...updates.destinationAddress
            };
        }

        if (updates.weight !== undefined) shipment.weight = updates.weight;
        if (updates.price !== undefined) shipment.price = updates.price;
        if (updates.packageStatus !== undefined) shipment.packageStatus = updates.packageStatus;
        if (updates.route_id !== undefined) shipment.route_id = updates.route_id;
        if (updates.isCancelled !== undefined) shipment.isCancelled = updates.isCancelled;

        await shipment.save();
        res.json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id);
        
        if (!shipment) {
            return res.status(404).json({ error: "Envío no encontrado" });
        }

        res.json({ 
            message: "Envío eliminado correctamente",
            deletedShipment: shipment 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}