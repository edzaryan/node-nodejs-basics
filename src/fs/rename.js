import fs from 'fs/promises';
import path from 'path';

const rename = async () => {
    const oldFilePath = path.join('files', 'wrongFilename.txt');
    const newFilePath = path.join('files', 'properFilename.md');

    try {
        // Check if the old file exists
        await fs.access(oldFilePath);

        // Check if the new file already exists
        try {
            await fs.access(newFilePath);
            throw new Error('FS operation failed'); // If it exists, throw an error
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error; // Re-throw if it's not a "not found" error
            }
        }

        // Rename the file
        await fs.rename(oldFilePath, newFilePath);
    } catch (error) {
        console.log('FS operation failed');
    }
};

await rename();