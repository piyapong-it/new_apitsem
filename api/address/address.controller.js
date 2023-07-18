const {
  getProvince,
  getDistrict,
  getsubDistrict,
} = require("./address.service");

module.exports = {
  getProvince: (req, res) => {
    getProvince((err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      return res
        .status(200)
        .send(JSON.stringify({ success: true, result: results.recordset }));
    });
  },
  getDistrict: (req, res) => {
    const province = req.params.province;
    getDistrict(province, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      results.recordset.push({
        DISTRICT_ID: "0000",
        DISTRICT_NAME: "─",
        DISTRICT_EN: "─",
      });
      results.recordset.sort(function (a, b) {
        return a.DISTRICT_ID - b.DISTRICT_ID;
      });
      return res
        .status(200)
        .send(JSON.stringify({ success: true, result: results.recordset }));
    });
  },
  getsubDistrict: (req, res) => {
    const district = req.params.district;
    getsubDistrict(district, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send(JSON.stringify({ success: false, message: err, result: [] }));
      }
      results.recordset.push({
        SUBDISTRICT_ID: "0000",
        SUBDISTRICT_NAME: "─",
        SUBDISTRICT_EN: "─",
        ZIP_CODE: "─", 
      });
      results.recordset.sort(function (a, b) {
        return a.SUBDISTRICT_ID - b.SUBDISTRICT_ID;
      });
      return res
        .status(200)
        .send(JSON.stringify({ success: true, result: results.recordset }));
    });
  },
};
