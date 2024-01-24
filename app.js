const InvoiceGenerator = require('./invoiceGenerator');

const invoiceGenerator = new InvoiceGenerator();
invoiceGenerator.addItem(1, 'Item1', 10, 1);
invoiceGenerator.addItem(2, 'Item2', 15, 2);

const orders = [
    { itemId: 1, quantity: 2 },
    { itemId: 2, quantity: 1 },
];

const invoices = invoiceGenerator.generateInvoices(orders);

//Test the output using console
console.log(invoices.customerInvoice);
console.log(invoices.restaurantInvoices);
