let instance;

function isAlphaNumeric(char) {
    const code = char.charCodeAt(0);
    return (
        (code >= 48 && code <= 57) || // Numeric (0-9)
        (code >= 65 && code <= 90) || // Uppercase (A-Z)
        (code >= 97 && code <= 122)   // Lowercase (a-z)
    );
}

class PointsService {
    constructor() {
        if (instance) {
            throw new Error("New instance cannot be created");
        }
        instance = this;
    }

    getInstance() {
        return this;
    }

    //1 point for every alphanumeric character in the retailer name.
    getPointsForRetailerName(retailerName) {
        let points = 0;
        retailerName.split('').forEach(char => {
            if (isAlphaNumeric(char)) {
                points += 1;
            }
        });
        return points;
    }

    //50 points if the total is a round dollar amount with no cents.
    getPointsForTotalAsRoundDollarAmount(total) {
        let points = ((total - Math.floor(total)) === 0) ? 50 : 0;
        return points;
    }

    //25 points if the total is a multiple of 0.25
    getPointsForTotalIsMultipleOfAQuarter(total) {
        let points = ((total * 100) % 25 === 0) ? 25 : 0; 
        return points;
    }

    //5 points for every two items on the receipt.
    getPointsForEveryTwoItems(items) {
        let points = Math.floor(items.length / 2) * 5;
        return points;
    }

    //If the trimmed length of the item description is a multiple of 3, 
    //multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    getPointsForItemDescriptions(items) {
        let points = 0;
        items.forEach(item => {
            if (item.shortDescription.trim().length % 3 === 0) {
                points += Math.ceil(item.price * 0.2);
            }
        });
        return points;
    }

    //6 points if the day in the purchase date is odd.
    getPointsForDateIsOdd(purchaseDateTime) {
        const date = new Date(purchaseDateTime);
        let points = (date.getUTCDate() % 2 !== 0) ? 6 : 0;
        return points;
    }

    //10 points if the time of purchase is after 2:00pm and before 4:00pm.
    getPointsForTimeRange(purchaseDateTime) {        
        const date = new Date(purchaseDateTime);
        let points = (date.getUTCHours() >= 14 && date.getUTCHours() < 16) ? 10 : 0;
        return points;
    }

    getPoints(receipt) {
        if (receipt === null || receipt === undefined) {
            throw new Error(`Receipt is missing`);
        }

        let points = 0;
        points += this.getPointsForRetailerName(receipt.retailer);
        points += this.getPointsForTotalAsRoundDollarAmount(receipt.total);
        points += this.getPointsForTotalIsMultipleOfAQuarter(receipt.total);
        points += this.getPointsForEveryTwoItems(receipt.items);
        points += this.getPointsForItemDescriptions(receipt.items);
        points += this.getPointsForDateIsOdd(receipt.purchaseDateTime);
        points += this.getPointsForTimeRange(receipt.purchaseDateTime);
        return points;
    }
}

const singletonPointsService = Object.freeze(new PointsService());
module.exports = singletonPointsService;