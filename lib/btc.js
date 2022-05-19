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

function getIndexFromDate(arr, date) {
    return arr.findIndex(entry => entry.date.toISOString().slice(0,10) === date.toISOString().slice(0,10));
}

function getRange(rawData, startDate, endDate) {
    if (startDate > endDate) throw new Error('Start date after end date');

    let startIndex = getIndexFromDate(rawData, startDate);
    if (startIndex === -1) startIndex = 0; 
    let endIndex = getIndexFromDate(rawData, endDate);
    if (endIndex === -1) endIndex = rawData.length;
    
    return rawData.slice(startIndex, endIndex+1);
} 

function getRangeStats(range) {
    if (range?.length == 0) return null;

    const pricesArray = range.map(entry => entry.price);
    const count = range.length;
    const max = Math.max(...pricesArray);
    const min = Math.min(...pricesArray);
    const average = pricesArray.reduce((acc, curr) => acc+curr, 0)/count;
    const variation = `${((pricesArray.at(-1)-pricesArray.at(0))/pricesArray.at(0)*100).toFixed(2)}%`;
    return { count, max, min, average, variation };
}

function btcTools(start, end) {
    return new Promise(async (resolve, reject) => {
        try {
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (!startDate || !endDate) reject(new Error('Invalid arguments'));
        
            const result = await processFile('btc.csv');
            const rawData = await processData(result);
            const data = getRange(rawData, startDate, endDate);
            const stats = getRangeStats(data);
            resolve({ data, stats });
        } catch (error) {
            reject(error);    
        }
    });  
}

module.exports = btcTools;
