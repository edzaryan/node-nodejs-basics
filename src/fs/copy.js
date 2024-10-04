import fs from 'fs/promises';
import path from 'path';
import { mkdir, copyFile } from 'fs/promises';

const copy = async () => {
    const sourceDir = 'files';
    const destDir = 'files_copy';

    try {
        // Check if the source directory exists
        await fs.access(sourceDir);

        // Check if the destination directory already exists
        try {
            await fs.access(destDir);
            throw new Error('FS operation failed'); // If it exists, throw an error
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error; // Re-throw if it's not a "not found" error
            }
        }

        // Create the destination directory
        await fs.mkdir(destDir);

        // Copy all files from the source directory to the destination directory
        const files = await fs.readdir(sourceDir);
        await Promise.all(
            files.map(async (file) => {
                const srcFile = path.join(sourceDir, file);
                const destFile = path.join(destDir, file);
                const stats = await fs.stat(srcFile);

                if (stats.isDirectory()) {
                    // Recursively copy directories
                    await copyFolder(srcFile, destFile);
                } else {
                    // Copy file
                    await fs.copyFile(srcFile, destFile);
                }
            })
        );

    } catch (error) {
        console.log('FS operation failed');
    }
};

await copy();
