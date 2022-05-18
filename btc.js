const fs = require('fs');
const path = require('path');

async function processFile(fileName) {
    return new Promise((resolve, reject) => {
        if (!fileName) reject(new Error('No file provided'));

        const filePath = path.join(__dirname, fileName);
            setTimeout(() => resolve(filePath), 2000);
        });
}

(async function main() {
    try {
        const result = await processFile('btc.js');
        console.log(`From promise: ${result}`);   
    } catch (error) {
        console.log(err.message);    
    }
})()
