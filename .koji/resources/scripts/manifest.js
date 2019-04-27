const fs = require('fs');


module.exports = () => {

    const { metadata } = JSON.parse(fs.readFileSync('../.koji/metadata.json', 'utf8'));

    const manifest = {
        fingerprints: false, 
        name: metadata.title,
        short_name: metadata.title,
        start_url: '.',
        display: 'standalone',
        description: metadata.description,
        icons: [{
            src: metadata.icon,
            sizes: '32x32',
        }],
    }

    return JSON.stringify(manifest);
}
