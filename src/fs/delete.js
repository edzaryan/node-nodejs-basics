import fs from "fs/promises";
import path from 'path';

const remove = async () => {
    const fileToRemove = 'fileToRemove.txt';
    const filePath = path.join('files', fileToRemove);

    try {
        // Check if the file exists
        await fs.access(filePath);

        // Delete the file
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If the file does not exist, log an error message
            console.log('FS operation failed');
        }
    }
};

await remove();