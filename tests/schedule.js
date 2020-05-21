const main = require('../main');
const nativeCodeSample = function() {
	const date = new Date();
	console.log(date, 'Hello' + ", World!");
	process.exit();
};
main.execute(nativeCodeSample, function(error, stdout, stderr) {
  if (error) {
    console.log(error);
  } else {
  	console.log(stdout, stderr);
  }
});
main.schedule('* * * * * *', nativeCodeSample);
