const fs = require('fs');
const path = require('path');

async function processFile(fileName) {
    return new Promise((resolve, reject) => {
        if (!fileName) reject(new Error('No file provided'));
        
        const filePath = path.join(__dirname, fileName);
        let fileContents = '';

        const onDataHandler = chunk => {
            console.log(`Received chunk: ${chunk.length}`);
            fileContents += chunk.toString();
        };

        const onEndHandler = () => resolve(fileContents);

        const onErrorHandler = error => reject(error);

        fs.createReadStream(filePath)
            .on('data', onDataHandler)
            .on('end', onEndHandler)
            .on('error', onErrorHandler)
    });
}

(async function main() {
    try {
        const result = await processFile('btc.csv');
        console.log(result.slice(0,200));
    } catch (error) {
        console.log(error.message);    
    }
})()
