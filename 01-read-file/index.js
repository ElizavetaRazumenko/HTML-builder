const { stdout } = require('process');

const path = require('path');

const fs = require('fs');


const text = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

text.on('data', data => stdout.write(data));


