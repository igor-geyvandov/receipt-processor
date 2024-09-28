const express = require("express");
const { body, param, matchedData, validationResult  } = require('express-validator');
const ReceiptsService = require("../services/receipts-service");
const PointsService = require("../services/points-service");
const router = express.Router();

router.get("/count",
    async function (req, res) {
        //Return 200 with count of receipts, or 500 otherwise        
        try {
            const count = ReceiptsService.getReceiptsCount();
            return res.status(200).send({
                count: count
            });
        }
        catch (error) {
            return res.status(500).send({
                error: "Something went wrong :("
            });
        }
    }
);

router.get("/:id",
    //Validate input
    param("id").isUUID(),
    async function (req, res) {
        //Return 400 if there are input validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                errors: validationErrors.array()
            });
        }

        //Return 200 if receipt is found, or 404 otherwise        
        try {
            const id = req.params.id;
            const receipt = ReceiptsService.getReceipt(id);
            return res.status(200).send(receipt);
        }
        catch (error) {
            return res.status(404).send({
                error: error.message
            });
        }
    }
);

router.get("/:id/points",
    //Validate input
    param("id").isUUID(),
    async function (req, res) {
        //Return 400 if there are input validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                errors: validationErrors.array()
            });
        }

        //Return 200 if receipt is found, or 404 otherwise        
        try {
            const id = req.params.id;
            const receipt = ReceiptsService.getReceipt(id);
            const points = PointsService.getPoints(receipt);
            return res.status(200).send({
                points: points
            });
        }
        catch (error) {
            return res.status(404).send({
                error: error.message
            });
        }
    }
);

router.post("/process",
    //Validate and sanitize input
    body("retailer").exists().isString().notEmpty().trim(),
    body("purchaseDate").exists().isDate(),
    body("purchaseTime").exists().isTime(),
    body("items").exists().isArray({ min: 1}),
    body('items.*.shortDescription').exists().isString().notEmpty().trim(),
    body('items.*.price').exists().isFloat({ min: 0.01}).toFloat(),
    body("total").exists().isFloat({ min: 0.01}).toFloat(),
    async function (req, res) {
        //Return 400 if there are input validation errors
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                errors: validationErrors.array()
            });
        }
        
        //Return 201 if receipt is created, or 500 otherwise  
        try {
            const receipt = matchedData(req);            
            const id = ReceiptsService.addReceipt(receipt);
            return res.status(201).send({
                id: id
            });
        }
        catch (error) {
            return res.status(500).send({
                error: error.message
            });
        }
    }
);

module.exports = router;