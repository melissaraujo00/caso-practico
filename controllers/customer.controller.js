const Customer = require("../models/customer");

exports.getCustomer = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.postCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.json(customer)
    } catch (error) {
        res.status(500).json({error: error.message })
    }
}

exports.putCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(customer)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Cliente Eliminado"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}