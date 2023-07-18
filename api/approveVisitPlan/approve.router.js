const { 
    sendMailApproveVisitPlan,
    getExtendByAsm
 } = require("./approve.controller");
 
 const routerApprove = require("express").Router();
 const { checkToken } = require("../../auth/token_validation");
 
 routerApprove.post("/sendMailApprove/", sendMailApproveVisitPlan);
 routerApprove.get("/getExtendByAsm/:AsmCode", getExtendByAsm);
 
 module.exports = routerApprove;