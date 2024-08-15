const express = require("express");

const router = express.Router();

const {
  GenerateShortURL,
  redirectToOriginal,
  getAnalytics,
} = require("../controllers/url");

router.post("/", GenerateShortURL);

router.get("/:shortid", redirectToOriginal);

router.get("/getAnalytics/:shortid", getAnalytics);

module.exports = router;
