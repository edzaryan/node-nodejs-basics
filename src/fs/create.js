import fs from 'fs/promises';
import path from 'path';

const create = async () => {
    const dirName = 'files';
    const filePath = path.join(dirName, 'fresh.txt');

    try {
        // Check if the file already exists
        await fs.access(filePath);
        throw new Error(); // If it exists, throw an exception
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If the file doesn't exist, create the folder and write the file
            await fs.mkdir(dirName, { recursive: true });
            await fs.writeFile(filePath, 'I am fresh and young');
        } else {
            // Handle other errors
            console.log('FS operation failed');
        }
    }
};

await create();
