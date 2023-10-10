const sql8 = require("msnodesqlv8");
var config = require("../dbConfig");

const sql = require('mssql/msnodesqlv8')

const pool = new sql.ConnectionPool({
  database: 'BIAD',
  server: '.',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})

const qry = "select * from CRM.DEPARTEMENT";
async function getDepts(fn)
{
    try{
        sql8.query(config,qry,(err,rows)=>{
            //console.log(rows);
            fn(rows);
        })
    }
    catch (error){
        console.log(error);
    }
}
function  getDepartements() {
    try {
        pool.connect().then(() => {
            //simple query
            pool.request().query(qry, (err, result) => {
                  console.dir(result)
              })
          })



    //   let  pool = await  sql.connect(config);
    //   let  departements = await  pool.request().query(qry);
    //   return  departements.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  getDepartement(idDep) {
    try {
      let  pool = await  sql.connect(config);
      let  departements = await  pool.request()
                                .input('input_parameter_idDep', sql.Int, idDep)
                                .query("SELECT * from CRM.DEPARTEMENT where ID_DEP = @input_parameter_IdDep");
      return  departements.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  addDepartement(dep) {
    try {
      let  pool = await  sql.connect(config);
      let  departements = await  pool.request()
                        .input('ID_DEP', sql.Int, dep.ID_DEP)
                        .input('CODE_DEP', sql.NVarChar, dep.CODE_DEP)
                        .input('NOM_DEP', sql.NVarChar, dep.NOM_DEP)
                        .input('ID_REG', sql.Int, dep.ID_REG)
                        .execute('InsertDepartement');
      return  departements.recordsets;    }
    catch (error) {
      console.log(error);
    }
  }

  module.exports ={
    getDepts:getDepts,
    getDepartements:getDepartements,
    getDepartement:getDepartement,
    addDepartement:addDepartement
}

// async function getDepartements()
// {
//     try{
//         sql.query(config,qry,(err,rows)=>{
//             console.log(rows);
//         })
//     }
//     catch (error){
//         console.log(erro);
//     }
// }
// module.exports ={
//     getDepartements:getDepartements
// }