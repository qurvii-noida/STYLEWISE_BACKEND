const mongoose = require("mongoose");

const alterStyleSchema = new mongoose.Schema({
    style_number: {
        type: Number,
        requried: true,
    },
    actual_size: {
        type: String,
        requried: true,
    },
    alter_size: {
        type: String,
        requried: true,
    },
    employee_id: {
        type: Number,
        required: true,
    },
    pick_list_id: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
    }
    ,
    alterId: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true
    }
)

const AlterStyle = mongoose.model("AlterStyle", alterStyleSchema);
module.exports = AlterStyle;