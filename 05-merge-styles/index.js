const path = require('path');

const fs = require('fs');

const fsProm = fs.promises;

const slylesPath = path.join(__dirname, 'styles');

const output = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));

fsProm.readdir(slylesPath)
      .then(async (items) => {

        items.forEach(async (item) => {

            const fPath = path.join(slylesPath, item);
            const fTitle = path.basename(fPath);
            const extName = path.extname(fPath);

            if (extName === '.css') {
                const input = fs.createReadStream(path.join(slylesPath, fTitle));
                input.on('data', data => {
                    output.write(data.toString() + '\n');
                });
            }
        });
      })