const query = require('../infra/database/queries')

class Appointment{
    add(appointment){
        const sql = 'INSERT INTO Appointments SET ?'
        return query(sql,appointment)
    }

    list(){
        const sql = 'SELECT * FROM Appointments'
        return query(sql)
    }


}

module.exports = new Appointment()