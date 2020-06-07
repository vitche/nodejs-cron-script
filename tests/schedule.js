const main = require('../main');
const nativeCodeSample = function () {
    const fs = require('fs');
    const date = new Date();
    console.log(date, 'Hello' + ", World!");
    fs.writeFileSync('/data/PROJECTS/nodejs-cron-script/' + date + '.bin', ':)', {
        flags: 'a+'
    });
    process.exit();
};
const callback = function (error, stdout, stderr) {
    if (error) {
        console.log(error);
    } else {
        console.log(stdout, stderr);
    }
};
main.schedule('* * * * *', nativeCodeSample, callback);
let compiledCodeSample = main.compile(nativeCodeSample);
main.schedule('* * * * *', compiledCodeSample, callback);
