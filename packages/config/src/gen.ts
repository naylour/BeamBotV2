import Config from './config.ts';
import fs from 'fs/promises';
import path from 'path';

const 
    rootDirectory = import.meta.env.PWD?.split('/').slice(0, -2).join('/') as string,
    projectFolders = ['apps', 'packages'];

root: for(const projectFolder of projectFolders) {
    const 
        repositoyPath = path.join(rootDirectory, projectFolder),
        repositories = await fs.readdir(repositoyPath, 'utf-8');

    for(const repository of repositories) {
        const repositoryPath = path.join(repositoyPath, repository);

        try {
            const envFilePath = path.join(repositoryPath, '.env');
            
            await fs.readFile(envFilePath, 'utf-8');
            
            const config = new Config(envFilePath);
            
            const filePath = path.join(import.meta.dirname, '..', 'env', `${repository}.js`);

            await Bun.write(filePath, `export default ${JSON.stringify(config.env, null, 4)};`.trim());

            await Bun.$`npm pkg set exports[${repository === 'config' ? '.' : './' + repository}]="./env/${repository}.js"`;
        } catch(__error__) {}
    }
}