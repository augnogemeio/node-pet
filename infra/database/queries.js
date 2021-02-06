const connection = require('./connection')

const runQuery = (sqlStatement, parameters = '') =>{  //parameters = '' indicates a default value of null
    return new Promise ((resolve,reject) =>{
        connection.query(sqlStatement, parameters, (error,results,fields) => {
            if (error){
                reject(error)
            } else {
                resolve(results)
            }
        })
    })



}

module.exports = runQuery