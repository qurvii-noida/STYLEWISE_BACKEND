const express = require("express");
const { addAlterStyle, getAlterStylesList, getAlterStylesByPicklist_Id, updateStatus } = require("../../controllers/alterStyle/alterStyle.controller.js");
const router = express.Router();

router.route("/add-alter-style").post(addAlterStyle);
router.route("/get-alterList").get(getAlterStylesList);
router.route("/picklist-id").post(getAlterStylesByPicklist_Id);
router.route("/update").post(updateStatus);

module.exports = router;