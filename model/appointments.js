const moment = require('moment')

const axios = require('axios')

const connection = require('../infra/connection')

class Appointment {
    add(appointment, res) {
        const sql = 'INSERT INTO Appointments SET ?'


        const createDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(appointment.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const datedAppointment = {...appointment, createDate, date}

        //Business constraints (client name>=5, date must be after currentDate)

        const booleanIsValidDate = moment(date).isSameOrAfter(createDate)
        const booleanIsClientDocIdValid = appointment.clientDocId.length >= 5

        const validations = [
            {
                name: 'date',
                valid: booleanIsValidDate,
                message: 'Date must be equal or after current date.'
            },
            {
                name: 'clientDocId',
                valid: booleanIsClientDocIdValid,
                message: 'Client Doc Id must have 5 characters or more.'
            }
        ]

        const errorsDetected = validations.filter(field => !field.valid)
        const booleanThereIsErrors = errorsDetected.length // if length > 0, so there is an error

        if (booleanThereIsErrors){
            res.status(400).json(errorsDetected)
        } else {
            connection.query(sql, datedAppointment, (error, results) => {
                if(error) {
                    //console.log(error)
                    //res.json(error)
                    res.status(400).json(error)
                } else {
                    //console.log(results)
                    //res.json(results)
                    const returnedId = results.insertId
                    res.status(201).json({...appointment,returnedId})
                }
            })                      
        }
    }

    list(res) {
        const sql = 'SELECT * FROM appointments'

        connection.query(sql, (error, results) => { 
            if(error) {
                res.status(400).json(error)
            } else { 
                res.status(200).json(results)
            }}
            )
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
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
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