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
const closureStringArgument = 'Hello, World!';
let closureCodeSample = function () {
    console.log(closureStringArgument);
    process.exit();
};
closureCodeSample = main.compile(closureCodeSample, {
    "closureStringArgument": closureStringArgument
});
main.execute(closureCodeSample, function (error, stdout, stderr) {
    if (error) {
        console.log(error);
    } else {
        console.log(stdout, stderr);
    }
});
