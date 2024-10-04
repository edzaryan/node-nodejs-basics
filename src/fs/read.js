import path from "path";
import fs from "fs/promises";

const read = async () => {
    const filePath = path.join('files', 'fileToRead.txt');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await read();