const express = require('express')

const app = new express()
const faker = require('faker')

app.get('/:docId', (req, res) => {
    const { docId } = req.params

    res.status(200).json({
        docId,
        clientName: faker.name.findName(),
        dateOfBirth: faker.date.past()
    })
})

app.listen(8082, () => console.log('Api running'))