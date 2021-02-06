const moment = require('moment')

const axios = require('axios')

const connection = require('../infra/database/connection')

const repository = require('../repository/appointment')

class Appointment {

    constructor(){

        this.booleanIsValidDate = ({date,createDate}) => moment(date).isSameOrAfter(createDate)
        this.booleanIsClientDocIdValid = ({docIdLenght}) => docIdLenght >= 5
        //this.booleanIsClientDocIdValid = appointment.clientDocId.length >= 5

        this.validate = parameters =>
            this.validations.filter(field => {
                const { name } = field
                const parameter = parameters[name]

                return !field.valid(parameter)
            })


        this.validations = [
            {
                name: 'date',
                valid: this.booleanIsValidDate,
                message: 'Date must be equal or after current date.'
            },
            {
                name: 'clientDocId',
                valid: this.booleanIsClientDocIdValid,
                message: 'Client Doc Id must have 5 characters or more.'
            }
        ]

    }

    add(appointment) {
        //const sql = 'INSERT INTO Appointments SET ?'


        const createDate = moment().format('YYYY-MM-DD HH:MM:ss')
        const date = moment(appointment.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:ss')
        const datedAppointment = {...appointment, createDate, date}

        //Business constraints (client name>=5, date must be after currentDate)

        const parameters = {
            date: { date, createDate },
            clientDocId: { docIdLenght: appointment.clientDocId.length }
        }


        //const errorsDetected = this.validations.filter(field => !field.valid)
        const errorsDetected = this.validate(parameters)
        const booleanThereIsErrors = errorsDetected.length // if length > 0, so there is an error

        if (booleanThereIsErrors){
            //res.status(400).json(errorsDetected)
            return new Promise((resolve,reject)=>reject(errorsDetected))
        } else {
            return repository.add(datedAppointment)
            .then(results =>{
                const returnedId = results.insertId
                return ({...appointment,returnedId})
            })


                            
        }
    }

    list() {
        return repository.list()
        
    }    


    idSearch(id, res){
        const sql = `SELECT * FROM appointments WHERE id=${id}`;

        connection.query(sql, async (error,results) => {
            const appointment = results[0] //for return only one single result as json, and not an array with 1 element
            const clientDocId = appointment.clientDocId
            if (error){
                res.status(400).json(error)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${clientDocId}`)
                
                appointment.clientDocId = data

                res.status(200).json(appointment)
            }
        })

    }

    updateById(id,values,res){
        if (values.date){
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:ss')
        }
        
        const sql = 'UPDATE appointments SET ? WHERE id = ?'

        connection.query(sql, [values,id], (error,results) =>{
            if (error){
                res.status(400).json(error)
            } else {
                res.status(200).json({...values,id})
            }
        })

    }

    deleteById(id,res){
        const sql = 'DELETE FROM appointments WHERE id = ?'

        connection.query(sql, id, (error,results) =>{
            if (error){
                res.status(400).json(error)
            } else {
                res.status(200).json(id)
            }
        })

    }

    



}


module.exports = new Appointment