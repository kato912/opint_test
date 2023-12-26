const qr = require('qrcode');
const fs = require('fs');
const randomstring = require('randomstring');

module.exports = async (req, res, next) => {
    try {
        const xxyxx = randomstring.generate(10);
        const Urladdpoint = `https://energetic-duck-buckle.cyclic.app/${xxyxx}`;
        const url = Urladdpoint;
        const outputFilePath = '/public/img/qrcode.png';

        const URLpoint = {
            URL: Urladdpoint,
        };
        const URLJson = JSON.stringify(URLpoint);

        await new Promise((resolve, reject) => {
            fs.writeFile("URL.json", URLJson, (error) => {
                if (error) {
                    console.error(`Error writing to URL.json: ${error}`);
                    reject(error);
                } else {
                    console.log('URL succeed');
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error(`Error in QR code generation and URL saving: ${error}`);
        return next(error);
    }
    
    next();
};
