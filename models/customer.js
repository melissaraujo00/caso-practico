const mongoose = require("mongoose");
const CustomerShema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    DUI: {
        type: String,
        require: true,
        unique: true
    },
    telephoneNumber: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        department: {
            type: String,
            require: true
        },
        municipality: {
            type: String,
            require: true
        },
        colonia: {
            type: String,
            require: true
        }
    },
    createAt:{
        createDate: {
            type: Date,
            default: Date.now
        },
        user_id: {
            type: Object,
            require: true
        }
    },
    updateAt:{
        createDate: {
            type: Date
        },
        user_id: {
            type: Object
        }
    },
    isActive: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model("Customer", CustomerShema);