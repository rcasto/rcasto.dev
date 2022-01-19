import path from 'path';
import ejs from 'ejs';
import fs from 'fs';
import { projects } from '../projects';
import { IProject } from './schemas';

const indexOutputPath = path.resolve('public');
const indexView = path.resolve('views/index.ejs');

async function renderProjects(viewPath: string, projects: IProject[]): Promise<string> {
    return await ejs.renderFile(viewPath, {
        projects,
    });
}

fs.promises.access(indexOutputPath)
    .catch(() => fs.promises.mkdir(indexOutputPath, {
        recursive: true,
    }))
    .then(() => renderProjects(indexView, projects))
    .then(view => fs.promises.writeFile(`${indexOutputPath}/index.html`, view))
    .then(() => console.log('View built and written successfully!'))
    .catch(err => console.error(err));