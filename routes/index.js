var express = require('express');
var router = express.Router();

// GET index server
router.get('/',function (req, res) {




    res.send("done");
});

module.exports = router;