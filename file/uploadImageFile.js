const fs = require('fs')
const pathlib = require('path')

module.exports = (path, fileName, callbackCreatedImage) => {
    const validFileExtensions = ['jpg', 'png', 'jpeg']
    const fileExtension = pathlib.extname(path)
    const validFileExtension = validFileExtensions.indexOf(fileExtension.substring(1)) !== -1

    if (validFileExtension) {
        const newPath = `./assets/images/${fileName}${fileExtension}`

        fs.createReadStream(path)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => callbackCreatedImage(false, newPath))
    } else {
        const error = 'Invalid file extension'
        console.log('Error! Invalid file extension')
        callbackCreatedImage(error)
    }
}