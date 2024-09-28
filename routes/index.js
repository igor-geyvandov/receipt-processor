var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {    
    var data = {
        status: "OK",
        time: new Date().toISOString()
    };
	return res.send(data);
});

module.exports = router;