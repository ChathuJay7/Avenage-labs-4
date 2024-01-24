const Item = require('./item');
const Order = require('./order');

class InvoiceGenerator {
    constructor() {
        this.itemDatabase = {};
    }

    addItem(id, title, price, restaurantId) {
        this.itemDatabase[id] = new Item(id, title, price, restaurantId);
    }

    getItemDetails(order) {
        const { itemId, quantity } = order;
        const item = this.itemDatabase[itemId];
        return { ...item, quantity };
    }

    calculateItemCost(itemDetails) {
        return itemDetails.price * itemDetails.quantity;
    }

    addToRestaurantOrders(restaurantOrders, itemDetails) {
        const { restaurantId } = itemDetails;
        if (!restaurantOrders[restaurantId]) {
            restaurantOrders[restaurantId] = [];
        }
        restaurantOrders[restaurantId].push(itemDetails);
    }

    generateCustomerInvoice(orders, totalCost) {
        let invoice = 'Customer Invoice:\n';
        for (const order of orders) {
            const itemDetails = this.getItemDetails(order);
            invoice += `${itemDetails.quantity}x ${itemDetails.title}: $${this.calculateItemCost(itemDetails)}\n`;
        }
        invoice += `Total Cost: $${totalCost}`;
        return invoice;
    }

    generateRestaurantOrders(restaurantOrders) {
        const restaurantInvoices = {};
        for (const restaurantId in restaurantOrders) {
            let invoice = `Restaurant ${restaurantId} Order:\n`;
            for (const itemDetails of restaurantOrders[restaurantId]) {
                invoice += `${itemDetails.quantity}x ${itemDetails.title}\n`;
            }
            restaurantInvoices[restaurantId] = invoice;
        }
        return restaurantInvoices;
    }

    generateInvoices(orders) {
        let totalCost = 0;
        const restaurantOrders = {};

        for (const order of orders) {
            const itemDetails = this.getItemDetails(order);
            const itemCost = this.calculateItemCost(itemDetails);
            totalCost += itemCost;
            this.addToRestaurantOrders(restaurantOrders, itemDetails);
        }

        const customerInvoice = this.generateCustomerInvoice(orders, totalCost);
        const restaurantInvoices = this.generateRestaurantOrders(restaurantOrders);

        return { customerInvoice, restaurantInvoices };
    }
}

module.exports = InvoiceGenerator;
