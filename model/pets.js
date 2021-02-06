const connection = require('../infra/database/connection')

const uploadImageFile = require ('../infra/file/uploadImageFile')

class Pet{
    add (pet, res){
        const query = 'INSERT INTO Pets SET ?'

        uploadImageFile(pet.image, pet.name, (error,newPath) => {
            if (error) {
                res.status(400).json({error})
            } else {
                const myPet = {name: pet.name, image: newPath}

                connection.query(query,myPet, error => {
                    if (error){
                        console.log(error)
                        res.status(400).json(error)
                    } else {
                        res.status(200).json(myPet)
                    }
                })
            }

        })

    }
}

module.exports = new Pet()