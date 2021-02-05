const Pet = require('../model/pets')

module.exports = app => {
    app.post('/pets', (req, res) => {
        const pet = req.body

        Pet.add(pet, res)
    })
}