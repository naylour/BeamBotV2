import fs from 'fs/promises';
import path from 'path';

await Bun.$`npm pkg delete exports`;
await fs.rm(path.join(import.meta.dirname, '..', 'env'), {
    recursive: true, 
    force: true
});