const path = require('path');

const fs = require('fs');

const fsPromis = fs.promises;

fsPromis.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
        .then(items => {
    items.forEach(item => {

        if (!item.isDirectory()) {
            
            const fPath = path.join(__dirname, 'secret-folder', item.name);
            const fTitle = path.basename(fPath);
            const extName = path.extname(fPath);

            fsPromis.stat(fPath)
                    .then(result => {

                console.log(`${fTitle.replace(extName, '')} - ${extName.replace('.', '')} - ${Number(result.size / 2000).toFixed(3)}kb`);

            })
        }

    }

    )
   
})


