const { poolPromise, sql } = require("../../config/database");

module.exports = {
  sendMailApproveVisitPlan: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitDate", sql.NVarChar, data.VisitDate)
      .input("EmpJDE", sql.NVarChar, data.EmpJDE)
      .input("Status", sql.NVarChar, data.Status)
      .input("EmpLogin", sql.NVarChar, data.EmpLogin)
      .query(
        `DECLARE	@RetMessage varchar(150)
                        EXEC [spUpdateStatusVisitPlan] 
                        @VisitDate = @VisitDate,
                        @EmpJDE = @EmpJDE,
                        @Status = @Status,
                        @EmpLogin = @EmpLogin,
                        @RetMessage = @RetMessage OUTPUT
            
                         SELECT	@RetMessage as N'RetMessage' ;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getExtendByAsm: async (AsmCode, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("AsmCode", sql.NVarChar, AsmCode)
      .query(
        `DECLARE	@RetMessage varchar(150)
                        EXEC [spGetExtendByAsm] 
                        @AsmCode = @AsmCode,
                        @RetMessage = @RetMessage OUTPUT
            
                         SELECT	@RetMessage as N'RetMessage' ;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
};
