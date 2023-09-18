const {
  getOutletsBySalesID,
  getVolumeByOutletID,
  getOutletsNearby,
  getOutletByOutletID,
  getOutletsMapBySalesID,
  getOutletTypeStatus,
  getOutletAll,
  updateOutletDetail,
  OutletRequest,
} = require("./outlets.controller");

const routerOutlet = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

routerOutlet.get(
  "/getOutletsBySalesID/:userId",
  checkToken,
  getOutletsBySalesID
);
routerOutlet.get(
  "/getVolumeByOutletID/:getVolumeByOutletID",
  checkToken,
  getVolumeByOutletID
);
routerOutlet.get(
  "/getOutletByOutletID/:outletid",
  checkToken,
  getOutletByOutletID
);
routerOutlet.post("/getOutletsNearby/", checkToken, getOutletsNearby);
routerOutlet.get(
  "/getOutletsMapBySalesID/:userId",
  checkToken,
  getOutletsMapBySalesID
);
// new
routerOutlet.post("/getOutletTypeStatus", checkToken, getOutletTypeStatus);
routerOutlet.get("/getOutletAll", checkToken,  getOutletAll);
routerOutlet.post("/updateOutletDetail",checkToken, updateOutletDetail);
routerOutlet.get("/OutletRequest/:userId", OutletRequest);

module.exports = routerOutlet;
