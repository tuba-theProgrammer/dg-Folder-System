const express= require('express')
const app= express()

const InvoiceController = require('../../Controller/InvoiceController/Invoice.controller')
app.post('/CreateInvoice',InvoiceController.CreateInvoice)
app.post('/ViewInvoice',InvoiceController.ViewInvoice)
module.exports= app