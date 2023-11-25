const { glob } = require("glob");
const { promisify } = require("util");

async function loadFiles(dirName) {
    const Files = await glob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`);
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}

module.exports = { loadFiles };