const PointsService = require("./points-service");

test('6 pts for retailer name "Target"', () => {
    expect(PointsService.getPointsForRetailerName("Target")).toBe(6);
});
test('14 pts for retailer name "M&M Corner Market"', () => {
    expect(PointsService.getPointsForRetailerName("M&M Corner Market")).toBe(14);
});
test('9 pts for retailer name "Walgreens"', () => {
    expect(PointsService.getPointsForRetailerName("Walgreens")).toBe(9);
});
test('18 pts for retailer name "Dick\'s Sporting Goods"', () => {
    expect(PointsService.getPointsForRetailerName("Dick\'s Sporting Goods")).toBe(18);
});
test('0 pts for retailer name " "', () => {
    expect(PointsService.getPointsForRetailerName(" ")).toBe(0);
});
test('0 pts for retailer name ""', () => {
    expect(PointsService.getPointsForRetailerName("")).toBe(0);
});

test('50 pts for total $10', () => {
    expect(PointsService.getPointsForTotalAsRoundDollarAmount(10)).toBe(50);
});
test('0 pts for total $11.01', () => {
    expect(PointsService.getPointsForTotalAsRoundDollarAmount(11.01)).toBe(0);
});
test('0 pts for total $0.25', () => {
    expect(PointsService.getPointsForTotalAsRoundDollarAmount(0.25)).toBe(0);
});
test('0 pts for total $0.5', () => {
    expect(PointsService.getPointsForTotalAsRoundDollarAmount(0.5)).toBe(0);
});
test('50 pts for total $10000', () => {
    expect(PointsService.getPointsForTotalAsRoundDollarAmount(10000)).toBe(50);
});

test('25 pts for total $1', () => {
    expect(PointsService.getPointsForTotalIsMultipleOfAQuarter(1)).toBe(25);
});
test('0 pts for total $15.33', () => {
    expect(PointsService.getPointsForTotalIsMultipleOfAQuarter(15.33)).toBe(0);
});
test('25 pts for total $10.25', () => {
    expect(PointsService.getPointsForTotalIsMultipleOfAQuarter(10.25)).toBe(25);
});
test('25 pts for total $10.75', () => {
    expect(PointsService.getPointsForTotalIsMultipleOfAQuarter(10.75)).toBe(25);
});

test('5 pts for 2 items', () => {
    let items = [
        { shortDescription: "Mountain Dew 12PK", price: 6.49  },
        { shortDescription: "Emils Cheese Pizza", price: 12.25 }
    ];
    expect(PointsService.getPointsForEveryTwoItems(items)).toBe(5);
});
test('15 pts for 7 items', () => {
    let items = [
        { shortDescription: "Mountain Dew 12PK", price: 6.49  },
        { shortDescription: "Emils Cheese Pizza", price: 12.25 },
        { shortDescription: "Mountain Dew 12PK", price: 6.49  },
        { shortDescription: "Emils Cheese Pizza", price: 12.25 },
        { shortDescription: "Mountain Dew 12PK", price: 6.49  },
        { shortDescription: "Emils Cheese Pizza", price: 12.25 },
        { shortDescription: "Mountain Dew 12PK", price: 6.49  }
    ];
    expect(PointsService.getPointsForEveryTwoItems(items)).toBe(15);
});
test('0 pts for 0 items', () => {
    let items = [];
    expect(PointsService.getPointsForEveryTwoItems(items)).toBe(0);
});
test('0 pts for 1 items', () => {
    let items = [
        { shortDescription: "Mountain Dew 12PK", price: 6.49  }
    ];
    expect(PointsService.getPointsForEveryTwoItems(items)).toBe(0);
});
test('10 pts for 4 items', () => {
    let items = [
        { shortDescription: "Mountain Dew 12PK", price: 6.49  },
        { shortDescription: "Emils Cheese Pizza", price: 12.25 },
        { shortDescription: "Coke", price: 2.49  },
        { shortDescription: "Gummy Bears", price: 4.25 }
    ];
    expect(PointsService.getPointsForEveryTwoItems(items)).toBe(10);
});

test('6 pts when items have description length multiple of 3', () => {
    let items = [
        {shortDescription: "Mountain Dew 12PK", price: 6.49 },
        {shortDescription: "Emils Cheese Pizza", price: 12.25 },
        {shortDescription: "Knorr Creamy Chicken", price: 1.26 },
        {shortDescription: "Doritos Nacho Cheese", price: 3.35 },
        {shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ", price: 12.00 }
      ];
    expect(PointsService.getPointsForItemDescriptions(items)).toBe(6);
});
test('1 pts when items have description length multiple of 3', () => {
    let items = [
        {shortDescription: "M&M", price: 1.49 },
        {shortDescription: "Bread", price: 4.25 },
      ];
    expect(PointsService.getPointsForItemDescriptions(items)).toBe(1);
});

test('6 pts when purcahse date is oddd', () => {
    let purchaseDate = "Sun, 02 Jan 2022 13:13:00 GMT";
    expect(PointsService.getPointsForDateIsOdd(purchaseDate)).toBe(0);
});
test('6 pts when purcahse date is oddd', () => {
    let purchaseDate = "Mon, 03 Jan 2022 16:13:00 GMT";
    expect(PointsService.getPointsForDateIsOdd(purchaseDate)).toBe(6);
});
test('0 pts when purcahse date is oddd', () => {
    let purchaseDate = "Sat, 28 Sep 2024 8:13:00 GMT";
    expect(PointsService.getPointsForDateIsOdd(purchaseDate)).toBe(0);
});
test('6 pts when purcahse date is oddd', () => {
    let purchaseDate = "Thu, 5 Sep 2024 18:59:00 GMT";
    expect(PointsService.getPointsForDateIsOdd(purchaseDate)).toBe(6);
});

test('0 pts when purcahse time is before 2', () => {
    let purchaseDate = "Thu, 5 Sep 2024 13:59:00 GMT";
    expect(PointsService.getPointsForTimeRange(purchaseDate)).toBe(0);
});
test('10 pts when purcahse time is between 2 and 4 pm', () => {
    let purchaseDate = "Thu, 5 Sep 2024 14:00:00 GMT";
    expect(PointsService.getPointsForTimeRange(purchaseDate)).toBe(10);
});
test('10 pts when purcahse time is between 2 and 4 pm', () => {
    let purchaseDate = "Thu, 5 Sep 2024 14:20:00 GMT";
    expect(PointsService.getPointsForTimeRange(purchaseDate)).toBe(10);
});
test('10 pts when purcahse time is between 2 and 4 pm', () => {
    let purchaseDate = "Thu, 5 Sep 2024 15:59:00 GMT";
    expect(PointsService.getPointsForTimeRange(purchaseDate)).toBe(10);
});
test('0 pts when purcahse time is at 4 pm', () => {
    let purchaseDate = "Thu, 5 Sep 2024 16:00:00 GMT";
    expect(PointsService.getPointsForTimeRange(purchaseDate)).toBe(0);
});
test('0 pts when purcahse time is after 4 pm', () => {
    let purchaseDate = "Fri, 6 Sep 2024 16:01:00 GMT";
    expect(PointsService.getPointsForTimeRange(purchaseDate)).toBe(0);
});
