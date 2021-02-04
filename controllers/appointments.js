const Appointment = require('../model/appointments')

module.exports = app => {
    //app.get('/appointments',(req,res) => res.send('GET request using appointments route, ok'))

    app.get('/appointments',(req,res) =>{
        Appointment.list(res)
    })

    app.get('/appointments/:id',(req,res) =>{
        const id = parseInt(req.params.id) // convert from string to integer
        Appointment.idSearch(id,res)
    })


    app.post('/appointments',(req,res) => {
        console.log(req.body)

        const appointment = req.body

        Appointment.add(appointment, res)
        //res.send('POST request using appointments route, ok')


    })

    app.patch('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
    
        Appointment.updateById(id, values, res)
    })    


    app.delete('/appointments/:id', (req, res) => {
        const id = parseInt(req.params.id)
           
        Appointment.deleteById(id, res)
    })    
    
}