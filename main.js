const fs = require('fs');
const uuid = require('uuid').v4;
const exec = require('child_process').exec;
module.exports = {
	execute: function(nativeCode, callback) {
		const code = this._compile(nativeCode);
		exec(code, callback);
	},
	schedule: function(pattern, nativeCode, callback) {
		const compiledCode = this._compile(nativeCode);
		const path = this._export(compiledCode);
		const cronRecord = pattern + ' ' + path;
		const cronCommand = 'echo "' + cronRecord + '" | crontab';
		console.log(cronCommand);
		exec(cronCommand, callback);
	},
	_compile: function(nativeCode) {
		let code = "" + nativeCode;
		code = code.replace(/\r/g, '');
		code = code.replace(/\n/g, '');
		code = code.replace(/\) {	/g, '){')
		code = code.replace(/\"/g, '\\\"');
		code = code.replace(/!/g, '\\!');
		code = code.replace('function(){', '');
		code = code.substring(0, code.length-1);
		code = 'echo \"' + code + '\" | node';
		return code;
	},
	_export: function(code, callback) {
		const identifier = uuid();
		const path = process.cwd() + '/cron-' + identifier + '.sh';
		fs.writeFileSync(path, code, { 
			encoding: "utf8", 
			mode: 744,
			flag: "a+"
		});
		return path;
	} 
};
