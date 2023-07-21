const express = require("express");
const router = express.Router();
const quoteCtrl = require ("../../controller/api/quotes")

router.get("/", quoteCtrl.getAllQuote);
router.delete("/:id", quoteCtrl.deleteQuote)
router.post ("/", quoteCtrl.addQuote)

module.exports = router; 