const mongoose = require("mongoose");

const InvoiceSchema=new mongoose.Schema({
    subcription_ID:{
        type:String,
        required:true,
    },

    Org_ID:{
        type:String,
        required:true,
    },

    Transaction_ID:{
        type:String,
        required:true,
    },

    Invoice_Status:{
        type:Boolean,
        default:true,
    }

},{
    timestamps:true
})



const Invoice_Schema = mongoose.model("Invoice", InvoiceSchema);
module.exports={ Invoice_Schema}

