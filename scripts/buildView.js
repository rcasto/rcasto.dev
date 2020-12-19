const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const util = require('util');
const projects = require('../projects/index');

const writeFilePromise = util.promisify(fs.writeFile);

const indexOutputPath = path.resolve('dist/public');
const indexView = path.resolve('views/index.ejs');

async function renderView(viewPath, data) {
    return await ejs.renderFile(viewPath, data);
}

if (!fs.existsSync(indexOutputPath)) {
    fs.mkdirSync(indexOutputPath, {
        recursive: true,
    });
}

renderView(indexView, {
    projects,
})
.then(view => writeFilePromise(`${indexOutputPath}/index.html`, view))
.then(() => console.log('View built and written successfully!'))
.catch(err => console.error(err));