import fs from "fs/promises";

const list = async () => {
    const dirPath = 'files';

    try {
        // Check if the directory exists
        await fs.access(dirPath);

        // Read the directory and get all filenames
        const files = await fs.readdir(dirPath);

        // Print all filenames to the console
        files.forEach(file => {
            console.log(file);
        });
    } catch (error) {
        // If the directory does not exist, log an error message
        console.log('FS operation failed');
    }
};

await list();