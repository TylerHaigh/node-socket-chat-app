const path = require('path');

const pathToRoot = '/../';

makePath = (folder) => {
    return path.join(__dirname, pathToRoot, folder);
};

const publicPath   = makePath('public');
const jqueryFolder = makePath('node_modules/jquery/dist/');
const momentFolder = makePath('node_modules/moment/');
const mustacheFolder = makePath('node_modules/mustache/');
const deparamFolder = makePath('node_modules/node-jquery-deparam/');

module.exports = {
    paths: {
        publicPath,
        jqueryFolder,
        momentFolder,
        mustacheFolder,
        deparamFolder
    }
};