const fs = require('fs');
const path = require('path');

function processFile(fileName) {
    if (!fileName) throw new Error('No file provided');

    const filePath = path.join(__dirname, fileName);
    setTimeout(() => console.log(`Completed: ${filePath}`), 2000);
}

const result = processFile('btc.csv')
console.log(`Expected: ${result}`);


