const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const projects = require('../projects/index');

const indexOutputPath = path.resolve('public');
const indexView = path.resolve('views/index.ejs');

async function renderView(viewPath, data) {
    return await ejs.renderFile(viewPath, data);
}

fs.promises.access(indexOutputPath)
    .catch(() => fs.promises.mkdir(indexOutputPath, {
        recursive: true,
    }))
    .then(() => renderView(indexView, {
        projects,
    }))
    .then(view => fs.promises.writeFile(`${indexOutputPath}/index.html`, view))
    .then(() => console.log('View built and written successfully!'))
    .catch(err => console.error(err));