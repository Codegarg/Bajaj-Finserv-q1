const express = require("express");
const router = express.Router();

const {
    handleBFHL,
    healthCheck
} = require("../controllers/bfhlController");

const validateRequest = require("../middlewares/validateRequest");

router.get("/health", healthCheck);
router.post("/bfhl", validateRequest, handleBFHL);

module.exports = router;
