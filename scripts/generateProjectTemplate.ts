import path from 'path';
import { writeFile } from 'fs/promises';
import { IProject } from './schemas';

const projectsDirectoryPath = path.resolve('projects');

const [
    projectName,
] = process.argv.slice(2);

if (!projectName) {
    console.error('No project name supplied as an argument.');
    process.exit(1);
}

const projectTemplateConfig: IProject = {
    name: projectName,
    description: '',
    links: [],
};

const projectTemplateAsString: string = [
    `import { IProject } from '../scripts/schemas';`,
    '',
    `export const ${projectName}: IProject = ${JSON.stringify(projectTemplateConfig, null, '\t')};`,
].join('\n');

const projectTemplateFilePath = `${projectsDirectoryPath}/${projectName}.ts`;

writeFile(projectTemplateFilePath, projectTemplateAsString)
    .then(() => console.log(`Created template for ${projectName} - ${projectTemplateFilePath}`))
    .catch(err => console.error(err));