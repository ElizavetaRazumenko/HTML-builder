const { stdin, stdout, exit } = require('process');

const path = require('path');

const fs = require('fs');


const text = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Enter your text!\n');

stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        stdout.write('Bye!');
        exit();
    }
    
    text.write(data);
})

process.on('SIGINT', () => {
    stdout.write('Bye!');
        exit();
})