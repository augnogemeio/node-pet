class Tables {
    init(connection) {
        this.connection = connection

        this.createAppointments()
        //console.log('Tables called')
    }

    createAppointments(){
        const sql = 'CREATE TABLE IF NOT EXISTS Appointments (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, petName varchar(20),service varchar(20) NOT NULL, date datetime NOT NULL, createDate datetime NOT NULL, status varchar(20) NOT NULL, notes text, PRIMARY KEY(id))'
        
        this.connection.query(sql, error => {
            if(error) {
               console.log(error)
            } else {
               console.log('Table Appointments succefuly created')
            }
        })   
    }
}

module.exports = new Tables



