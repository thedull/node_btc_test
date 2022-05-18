const fs = require('fs');
const path = require('path');

function processFile(fileName) {
    return new Promise((resolve, reject) => {
        if (!fileName) reject(new Error('No file provided'));

        const filePath = path.join(__dirname, fileName);
            setTimeout(() => resolve(filePath), 2000);
        });
}

const result = processFile()
    .then(successHandler)
    .catch(rejectHandler)

function successHandler(result) {
    console.log(`From promise: ${result}`);
}

function rejectHandler(err) {
    console.log(err.message);
}


