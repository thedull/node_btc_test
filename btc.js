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
            const dataArr = dataBuffer.split("\r\n").slice(1)
                .map(line => {
                    const entries = line.split(',\"');
                    const date = new Date(entries[0].replace('\"', ''));
                    const price = +(entries[1].replace('\"', '').replace(',', '')); 
                    return { date, price };
                })
                .sort((a, b) => a.date.getTime() - b.date.getTime());
            resolve(dataArr);   
        } catch (error) {
            reject(error.message);
        }
    });
}

function getRange(rawData, startDate, endDate) {
    if (startDate > endDate) throw new Error('Start date after end date');

    let startIndex = rawData.findIndex(entry => entry.date.toISOString().slice(0,10) === startDate.toISOString().slice(0,10));
    if (startIndex === -1) startIndex = 0; 
    let endIndex = rawData.findIndex(entry => entry.date.toISOString().slice(0,10) === endDate.toISOString().slice(0,10));
    if (endIndex === -1) endIndex = rawData.length;
    
    return rawData.slice(startIndex, endIndex+1);
} 

(async function main() {
    try {
        const startDate = new Date(process.argv[2]);
        const endDate = new Date(process.argv[3]);
        if (!startDate || !endDate) reject(new Error('Invalid arguments'));

        const result = await processFile('btc.csv');
        const rawData = await processData(result);
        const data = getRange(rawData, startDate, endDate);
        console.log({ data });
    } catch (error) {
        console.log(error.message);    
        console.log('Usage: node btc.js <startDate (YYYY-MM-DD)> [endDate (YYYY-MM-DD)]');    
    }
})()
