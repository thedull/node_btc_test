const fs = require('fs');
const path = require('path');

async function processFile(fileName) {
    return new Promise((resolve, reject) => {
        if (!fileName) reject(new Error('No file provided'));
        
        const filePath = path.join(__dirname, fileName);
        let fileContents = '';

        const onDataHandler = chunk => {
            // console.log(`Received chunk: ${chunk.length}`);
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

async function processData(dataBuffer) {
    return new Promise((resolve, reject) => {
        try {
            const startLine = +process.argv[2] || 1;
            const endLine = +process.argv[3] || Infinity;
            const dataArr = dataBuffer.split("\r\n").slice(startLine-1, endLine).join("\r\n");
            resolve(dataArr);   
        } catch (error) {
            reject(error.message);
        }
    });
}

(async function main() {
    try {
        const result = await processFile('btc.csv');
        console.log(await processData(result));
    } catch (error) {
        console.log(error.message);    
    }
})()
