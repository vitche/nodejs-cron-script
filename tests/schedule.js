const main = require('../main');
const nativeCodeSample = function() {
	const fs = require('fs');
	const date = new Date();
	console.log(date, 'Hello' + ", World!");
	fs.writeFileSync('/data/PROJECTS/nodejs-cron-script/' + date + '.bin', ':)', {
		flags: 'a+'
	});
	process.exit();
};
/*
main.execute(nativeCodeSample, function(error, stdout, stderr) {
  if (error) {
    console.log(error);
  } else {
  	console.log(stdout, stderr);
  }
});
*/
main.schedule('* * * * *', nativeCodeSample, function(error, stdout, stderr) {
  if (error) {
    console.log(error);
  } else {
  	console.log(stdout, stderr);
  }
});
