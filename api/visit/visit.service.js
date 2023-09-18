const { poolPromise, sql } = require("../../config/database");

module.exports = {
  createVisit: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("OutletId", sql.NVarChar(30), data.outletid)
      .input("VisitDate", sql.NVarChar, data.visitdate)
      .input("JdeCode", sql.NVarChar(10), data.jdecode)
      .input("Lat", sql.NVarChar(30), data.lat)
      .input("Lng", sql.NVarChar(30), data.lng)
      .query(
        `DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spInsertVisit]
                    @OutletID = @OutletId,
                    @VisitDate = @VisitDate,
                    @JdeCode = @JdeCode,
                    @Lat = @Lat,
                    @Lng = @Lng,
                    @RetMessage = @RetMessage OUTPUT
            
                    SELECT	@RetMessage as N'RetMessage' ;`,
        (error, results, fieds) => {
          if (error) {
            console.log("error");
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getVisitAgenda: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("OutletId", sql.NVarChar, data.outletid)
      .input("VisitDate", sql.NVarChar, data.visitdate)
      .query(
        "Exec spGetVisitAgenda @P_OutletID = @OutletId,@P_VisitDate = @VisitDate;",
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getVisitEOE: async (data, callBack) => {
    const pool = await poolPromise;
    console.log(data, "data visitEOE");
    const queryResult = await pool
      .request()
      .input("OutletId", sql.NVarChar, data.outletid)
      .input("VisitDate", sql.NVarChar, data.visitdate)
      .input("Group", sql.NVarChar, data.group)
      .input("Host", sql.VarChar, process.env.APP_HOST)
      .input("Port", sql.VarChar, process.env.APP_PORT)
      .query(
        `EXEC [spGetVisitEOE]
                    @P_OutletID = @OutletId,
                    @P_VisitDate = @VisitDate,
                    @P_Group = @Group,
                    @P_HOST = @Host,
                    @P_PORT = @Port ;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getVisitMjp: async (jdeCode, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("JdeCode", sql.NVarChar, jdeCode)
      .input("Host", sql.VarChar, process.env.APP_HOST)
      .input("Port", sql.VarChar, process.env.APP_PORT)
      .query(
        `EXEC [spGetVisitMJP] @P_JDECD = @JdeCode,@P_HOST = @Host,@P_PORT = @Port;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getVisitCallCard: async (visitid, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitId", sql.NVarChar, visitid)
      .input("Host", sql.VarChar, process.env.APP_HOST)
      .input("Port", sql.VarChar, process.env.APP_PORT)
      .query(
        `EXEC [spGetVisitCallCard] @P_VisitId = @VisitId,@P_HOST = @Host,@P_PORT = @Port;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getVisitCount: async (jdeCode, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("JdeCode", sql.NVarChar, jdeCode)
      .query(
        `EXEC [spGetVisitCount] @P_JDECD = @JdeCode;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  getVisit: async (outletId, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("OutletId", sql.NVarChar, outletId)
      .query(
        `EXEC [spGetVisit] @P_OutletId = @OutletId;`,
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
  },
  updateVisit: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitID", sql.NVarChar, data.visitid)
      .input("VisitStatus", sql.NVarChar, data.visitstatus)
      .input("UpdateBy", sql.NVarChar(30), data.updateby)
      .input("OultetID", sql.NVarChar(30), data.OultetID)
      .input("Date", sql.NVarChar(30), data.Date)
      .query(
        `DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisit]
                    @VisitID = @VisitID,
                    @VisitStatus = @VisitStatus,
                    @UpdateBy = @UpdateBy,
                    @OultetID = @OultetID,
                    @Date = @Date,
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
  updateVisitEOE: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitID", sql.NVarChar, data.visitid)
      .input("AgendaId", sql.Int, data.agendaid)
      .input("EoEseq", sql.Numeric, data.eoeseq)
      .input("EoEflag", sql.NChar, data.eoeflag)
      .query(
        `DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisitEoE]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @EoEseq = @EoEseq,
                    @EoEflag = @EoEflag,
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
  updateVisitAgenda: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitID", sql.NVarChar, data.visitid)
      .input("AgendaId", sql.Int, data.agendaid)
      .input("VisitStatus", sql.NVarChar, data.visitstatus)
      .query(
        `DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisitAgenda]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @VisitStatus = @VisitStatus,
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
  updateVisitCallCard: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitID", sql.NVarChar, data.visitid)
      .input("AgendaId", sql.Int, data.agendaid)
      .input("PMId", sql.Numeric, data.pmid)
      .input("Premas", sql.Decimal(18, 2), data.premas)
      .input("Mas", sql.Decimal(18, 2), data.mas)
      .input("Price", sql.Decimal(18, 2), data.price)
      .input("Stock", sql.Decimal(18, 2), data.stock)
      .input("ProductDate", sql.Date, data.productdate)
      .input("UpdateBy", sql.NVarChar, data.updateby)
      .input("OutletId", sql.NVarChar, data.outletid)
      .input("VisitDate", sql.Date, data.visitdate)
      .input("Seq", sql.Int, data.seq)
      .input("Remark", sql.NVarChar, data.remark)
      .query(
        `DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spUpdateVisitCallCard]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @PMId = @PMId,
                    @Premas = @Premas,
                    @Mas = @Mas,
                    @Price = @Price,
                    @Stock = @Stock,
                    @ProductDate = @ProductDate,
                    @UpdateBy = @UpdateBy,
                    @OutletId = @OutletId,
                    @VisitDate = @VisitDate,
                    @Seq = @Seq,
                    @Remark = @Remark,
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
  deleteVisitCallCard: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitID", sql.NVarChar, data.visitid)
      .input("AgendaId", sql.Int, data.agendaid)
      .input("PMId", sql.Numeric, data.pmid)
      .input("Seq", sql.Numeric, data.Seq)
      .query(
        `DECLARE	@RetMessage varchar(50)
                    EXEC	[dbo].[spDeleteVisitCallCard]
                    @VisitID = @VisitID,
                    @AgendaId = @AgendaId,
                    @PMId = @PMId,
                    @Seq = @Seq,
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

  getVisitEoEAll: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("P_OWN", sql.NVarChar, data.P_OWN)
      .input("P_VisitId", sql.NVarChar, data.P_VisitId)
      .query(
        `DECLARE	@RetMessage varchar(150)
                    EXEC	[dbo].[spGetProductByVisitIDNew] 
                    @P_VisitId = @P_VisitId,
                    @P_OWN = @P_OWN,

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

  getBrandActive: async (callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .query(
        `DECLARE	@RetMessage varchar(150)
                    EXEC	[dbo].[spGetBrandActive] 
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
  updateVisitEOEFlag: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitID", sql.NVarChar, data.VisitID)
      .input("OutletID", sql.NVarChar, data.OutletID)
      .input("VisitDate", sql.Date, data.VisitDate)
      .input("AgendaId", sql.Int, data.AgendaId)
      .input("AgendaGroup", sql.NVarChar, data.AgendaGroup)
      .input("EoEseq", sql.NVarChar, data.EoEseq)
      .input("EoEPM_ID", sql.NVarChar, data.EoEPM_ID)
      .input("EoEImage", sql.NVarChar, data.EoEImage)
      .input("EoEText", sql.NChar, data.EoEText)
      .input("EoEfocus", sql.NChar, data.EoEfocus)
      .input("EoEflag", sql.NVarChar, data.EoEflag)
      .input("UpdateBy", sql.NVarChar, data.UpdateBy)
      .query(
        `DECLARE	@RetMessage varchar(150)
                    EXEC	[dbo].[spUpdateProductVisitEOE]
                    @VisitID = @VisitID,
                    @OutletID = @OutletID,
                    @VisitDate = @VisitDate,
                    @AgendaId = @AgendaId,
                    @AgendaGroup = @AgendaGroup,
                    @EoEseq = @EoEseq,
                    @EoEPM_ID = @EoEPM_ID,
                    @EoEImage = @EoEImage,
                    @EoEText = @EoEText,
                    @EoEfocus = @EoEfocus,
                    @EoEflag = @EoEflag,
                    @UpdateBy = @UpdateBy,

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
  getVisitPlan: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitDate", sql.NVarChar, data.VisitDate)
      .input("EmpJDE", sql.NVarChar, data.EmpJDE)
      .query(
        `DECLARE	@RetMessage varchar(150)
                    EXEC	[dbo].[spGetVisitPlan] 
                    @VisitDate = @VisitDate,
                    @EmpJDE = @EmpJDE,

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
  getOutlVisitPlan: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitDate", sql.NVarChar, data.VisitDate)
      .input("EmpJDE", sql.NVarChar, data.EmpJDE)
      .query(
        `DECLARE	@RetMessage varchar(150)
                    EXEC	[dbo].[spGetOutlVisitPlan] 
                    @VisitDate = @VisitDate,
                    @EmpJDE = @EmpJDE,

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
  updateOutlVisitPlan: async (data, callBack) => {
    const pool = await poolPromise;
    const queryResult = await pool
      .request()
      .input("VisitDate", sql.NVarChar, data.VisitDate)
      .input("OutletId", sql.NVarChar, data.OutletId)
      .input("EmpJDE", sql.NVarChar, data.EmpJDE)
      .query(
        `DECLARE	@RetMessage varchar(150)
                    EXEC	[dbo].[spUpdateOutlVisitPlan] 
                    @VisitDate = @VisitDate,
                    @EmpJDE = @EmpJDE,
                    @OutletId = @OutletId,

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
