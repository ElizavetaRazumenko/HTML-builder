const fs = require('fs');
const fsProm = fs.promises;
const path = require('path');
const dist = path.join(__dirname, 'project-dist');
const slylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

(function createDistDir() {
    fs.kdir(path.join(__dirname, 'project-dist'), {
        recursive: true,
    }, err => {
        if (err) {
            throw new Error('Folder exist');
        }
    });
})();

(function createMarkupFile() {
    const input = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    const output = fs.createWriteStream(path.join(dist, 'index.html'));
    let str = '';
    input.on('data', data => {
        str = data.toString();

        function mapper(element) {
            return `${{element}}`;
        }

        const componentsPath = path.join(__dirname, 'components');

        fs.readdir(
            componentsPath,
            { withFileTypes: true },
            (err, data) => {
                if (err) {
                    throw err;
                }

                const tmp = [];
                data.forEach(temp => {
                    const fileName = temp.name.match(/([\w]*\.)*/)[0].replace('.', '');
                    tmp.push(mapper(fileName));
                });
            }
        )
    })
})