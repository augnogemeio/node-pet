//const express = require('express')
//const app = express()
//app.listen(3000, () => console.log('server running on port 3000'))
//app.get('/',(req,res) => res.send('server running, ok'))

const customExpress = require('./config/customExpress')

const connection = require('./infra/database/connection')

const Tables = require('./infra/database/tables')

connection.connect(error => {
    if (error){
        console.log(error)
    } else {
        console.log('connection succefull')
        // init application only after connected on DB

        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log('hi, server running on port 3000'))
    }

})


