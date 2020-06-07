const main = require('../main');
const nativeCodeSample = function () {
    console.log(new Date(), 'Hello' + ", World!");
    process.exit();
};
main.execute(nativeCodeSample, function (error, stdout, stderr) {
    if (error) {
        console.log(error);
    } else {
        console.log(stdout, stderr);
    }
});
