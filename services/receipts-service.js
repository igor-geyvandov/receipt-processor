const { v4: uuidv4 } = require('uuid');

let instance;
let inMemoryReceiptCollection = [];

class ReceiptsService {
    constructor() {
        if (instance) {
            throw new Error("New instance cannot be created");
        }
        instance = this;
    }

    getInstance() {
        return this;
    }

    addReceipt(receipt) {
        //Combine date and time into new field "purchaseDateTime" - the number of milliseconds since January 1, 1970 00:00:00 UTC
        receipt.purchaseDateTime = new Date(`${receipt.purchaseDate}T${receipt.purchaseTime}Z`).toUTCString();

        //Verify that receipt total matches the sum of its items
        let itemsSum = 0;
        receipt.items.forEach(item => {
            itemsSum += item.price;
        });
        itemsSum = Number(itemsSum.toFixed(2));
        if (itemsSum !== receipt.total) {
            throw new Error("Receipt total does not match the sum of items");
        }

        //Generate a new receipt ID and add it to the collection
        receipt.id = uuidv4();
        inMemoryReceiptCollection.push(receipt);
        return receipt.id;
    }

    getReceipt(id) {
        const receipt = inMemoryReceiptCollection.find(item => item.id === id);
        if (receipt === null || receipt === undefined) {
            throw new Error(`Receipt with ID ${id} not found`);
        }
        return receipt;
    }    

    getReceiptsCount() {
        return inMemoryReceiptCollection.length;
    }
}

const singletonReceiptsService = Object.freeze(new ReceiptsService());
module.exports = singletonReceiptsService;