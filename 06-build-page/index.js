const path = require('path');


const fs = require('fs');


const distPath = path.join(__dirname, 'project-dist');




async function stylesCopy(stylesPath) {
  const styleText = await fs.promises.readdir(stylesPath); 
  
  const files = styleText.filter((smth) => path.extname(smth) === '.css'); 

  let cssData = '';

  for (const file of files) {
    const filePath = path.join(stylesPath, file);
    const fileData = await fs.promises.readFile(filePath, 'utf-8');
    cssData += fileData + '\n';
  }
  
  const outputCSSPath = path.join(distPath, 'style.css');

  await fs.promises.writeFile(outputCSSPath, cssData); 
}

async function assetsCopy(assets, ultimate = path.join(distPath, 'assets'), outside = true) {
  if (outside)
    await fs.promises.rm(ultimate, { 
      recursive: true, force: true 
    });

  await fs.promises.mkdir(ultimate, { 
    ecursive: true 
  });

  const assetsFiles = await fs.promises.readdir(assets); 

  for (const assFile of assetsFiles) {

    const newPath = path.join(assets, assFile);
    const stats = await fs.promises.stat(newPath);

    if (stats.isDirectory()) {
      const toPath = path.join(ultimate, assFile); 

      await assetsCopy(newPath, toPath, false);
    } else {

      await fs.promises.copyFile(newPath, path.join(ultimate, assFile));
    }
  }
}


async function html_builder(tmpPath) {

  let tmpData = await fs.promises.readFile(tmpPath, 'utf-8'); 

  
  const componentsPath = path.join(__dirname, 'components');

  
  const newData = tmpData.match(/\{\{(.+?)\}\}/g)
                        .map(async (match) => {

  const component = match.slice(2, -2) + '.html';  
  const componentPath = path.join(componentsPath, component);
  const componentData = await fs.promises.readFile(componentPath, 'utf-8'); 

  tmpData = tmpData.replace(match, componentData);
    
  });


  await Promise.all(newData);

  const indexPath = path.join(__dirname, 'project-dist', 'index.html');
  await fs.promises.writeFile(indexPath, tmpData);
}

fs.mkdir(distPath, { 
  recursive: true 
        }, (err) => {
  if (err) throw err;

  html_builder(path.join(__dirname, 'template.html'));
  stylesCopy(path.join(__dirname, 'styles'));
  assetsCopy(path.join(__dirname, 'assets'));


});
