const { stdin,  exit } = require('process');

const path = require('path');

const fs = require('fs');


const text = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Enter your text!');

stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        console.log('Bye!');
        exit();
    }
    
    text.write(data);
})

process.on('SIGINT', () => {
    console.log('Bye!');
        exit();
})