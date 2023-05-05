

const fs = require('fs');

const fsProm = fs.promises;

const copyFile = fsProm.copyFile;

const path = require('path');

(function copyDir() {
    fs.mkdir(path.join(__dirname, 'files-copy'), {
        recursive: true,
    }, err => {
        if (err) {
            throw new Error('Folder exists');
        }
        console.log('Folder created');
    })

    fsProm.readdir(path.join(__dirname, 'files'))
          .then(items => {
            items.forEach(item => {
                const fPath = path.join(__dirname, 'files', item);
                copyFile(fPath, path.join(__dirname, 'files-copy', item));
                console.log(item);
            })
          })

})();