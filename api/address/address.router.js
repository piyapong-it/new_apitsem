const {
  getProvince,
  getDistrict,
  getsubDistrict,
} = require("./address.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/province", checkToken, getProvince);
router.get("/:province/district", checkToken, getDistrict);
router.get("/:district/subdistrict", checkToken, getsubDistrict);

module.exports = router;
