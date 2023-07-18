const { poolPromise, sql } = require("../../config/database");

module.exports = {
  getProvince: async (callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool.request().query(
      `SELECT [CM#PROVINCE_ID] PROVINCE_ID
      ,[CM#PROVINCE_NAME] PROVINCE_NAME
      ,[CM#PROVINCE_EN] PROVINCE_EN
      ,[CM#STRATEGIC] STRATEGIC
                    FROM [CM#PROVINCE] ORDER BY PROVINCE_ID`,
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getDistrict: async (province, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("province", sql.NVarChar, province)
      .query(
        `SELECT [CM#DISTRICT_ID]  DISTRICT_ID
        ,[CM#DISTRICT_NAME] DISTRICT_NAME
        ,[CM#DISTRICT_EN] DISTRICT_EN
                    FROM [CM#DISTRICT] 
                    WHERE CM#PROVINCE_ID = @province `,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }

          return callBack(null, results);
        }
      );
  },
  getsubDistrict: async (dictrict, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("dictrict", sql.NVarChar, dictrict)
      .query(
        `SELECT [CM#SUBDISTRICT_ID] SUBDISTRICT_ID
        ,[CM#ZIP_CODE] ZIP_CODE
        ,[CM#SUBDISTRICT_NAME] SUBDISTRICT_NAME
        ,[CM#SUBDISTRICT_EN] SUBDISTRICT_EN
                    FROM [CM#SUBDISTRICT]
                    WHERE CM#DISTRICT_ID = @dictrict `,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }

          return callBack(null, results);
        }
      );
  },
};
