const CronJob = require("cron").CronJob;
const connection = require("../database");

const job = new CronJob(
  "0 0 0 * * *",
  async function () {
    let today = new Date();

    const dateLikeSQL = today.toISOString().split("T")[0];

    try {
      const expiredJobs = await connection.query(
        "select * from publicacion_bolsa where fecha_expira = ? && status = 'Abierta'",
        [dateLikeSQL]
      );

      if (expiredJobs.length > 0) {
        console.log("Cerrando vacantes caducadas...");
        expiredJobs.map(async (job) => {
          await connection.query(
            "update publicacion_bolsa set status = 'Cerrada' where folio = ?",
            [job.folio]
          );
        });
        console.log(`Se cerraron ${expiredJobs.length} vacantes`);
      }
    } catch (error) {
      console.log(
        `Algo fue mal al intentar cerrar las vacantes caducadas del dia ${dateLikeSQL} (hoy) `
      );
      console.log(error);
    }
  },
  null,
  true
);

module.exports = job;
