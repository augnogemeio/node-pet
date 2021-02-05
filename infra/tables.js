class Tables {
    init(connection) {
        this.connection = connection

        this.createAppointments()
        this.createPets()
        //console.log('Tables called')
    }

    createAppointments(){
        const sql = 'CREATE TABLE IF NOT EXISTS Appointments (id int NOT NULL AUTO_INCREMENT, clientDocId varchar(20) NOT NULL, petName varchar(20),service varchar(20) NOT NULL, date datetime NOT NULL, createDate datetime NOT NULL, status varchar(20) NOT NULL, notes text, PRIMARY KEY(id))'
        
        this.connection.query(sql, error => {
            if(error) {
               console.log(error)
            } else {
               console.log('Table Appointments successfully created')
            }
        })   
    }

    createPets() {
        const query =
            'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY (id))'

        this.connection.query(query, error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Table Pets successfully created')
            }
        })
    }
}

module.exports = new Tables



