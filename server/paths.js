const path = require('path');

const pathToRoot = '/../';

makePath = (folder) => {
    return path.join(__dirname, pathToRoot, folder);
};

const publicPath   = makePath('public');
const jqueryFolder = makePath('node_modules/jquery/dist/');

module.exports = {
    paths: {
        publicPath,
        jqueryFolder
    }
};