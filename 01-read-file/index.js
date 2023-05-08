const path = require('path');

const fs = require('fs');


const text = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

text.on('data', data => console.log(data));


