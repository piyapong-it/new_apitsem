const { sendMailApproveVisitPlan, getExtendByAsm } = require("./approve.service");
var nodemailer = require("nodemailer");

module.exports = {
  sendMailApproveVisitPlan: (req, res) => {
    const body = req.body;
    sendMailApproveVisitPlan(body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      if (results.recordset.length == 0) {
        return res.status(200).send(
          JSON.stringify({
            success: true,
            message: "Record not found",
            result: [],
          })
        );
      }
      var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "tsem@tapb.co.th",
          pass: "Tapb@1874",
        },
      });
      var mailOptions = {
        from: "tsem@tapb.co.th",
        to: `${results.recordset[0].SALES_EMAIL}`,
        // to: `${results.recordset[0].SALES_EMAIL},${results.recordset[0].ASM_EMAIL}, peemanat@tapb.co.th`,
        subject: "TSEM Visit Plan Alert",
        text: `TSEM alert`,
        html: `<h4>Open application tsem to approve and verify.</h4>
        PLAN ID : ${results.recordset[0].PLAN_ID}<br/> PLAN VISIT DATE : ${results.recordset[0].PVISIT}
        <br/>SALES NAME : ${results.recordset[0].SALES_NAME}<br/>CREATE DATE : ${results.recordset[0].CREATE_DATE}
        <h3>STATUS : ${results.recordset[0].STATUS}</h3>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send(
              JSON.stringify({ success: false, message: error, result: [] })
            );
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .send(
              JSON.stringify({
                success: true,
                message: "successfully",
                result: [],
              })
            );
        }
      });
    });
  },
  getExtendByAsm: (req, res) => {
    console.log(req.params)
    const AsmCode = req.params.AsmCode;
    getExtendByAsm(AsmCode, (err, results) => {
      if (err) {
        console.log(err);
        return res.send(
          JSON.stringify({ success: false, message: err.message, result: [] })
        );
      }
      return res.send(
        JSON.stringify({
          success: true,
          message: "Total Record is " + results.recordset.length,
          result: results.recordset,
        })
      );
    });
  },
};
