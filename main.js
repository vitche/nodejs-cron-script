const fs = require('fs');
const uuid = require('uuid').v4;
const exec = require('child_process').exec;
module.exports = {
    execute: function (code, callback) {
        if ('function' === typeof code) {
            code = this.compile(code);
        }
        exec(code, callback);
    },
    schedule: function (pattern, code, callback) {
        if ('function' === typeof code) {
            code = this.compile(code);
        }
        const path = this._export(code);
        const cronRecord = pattern + ' ' + 'NODE_PATH="' + process.cwd() + '/node_modules" ' + path + ' > ' + path + '.log 2>&1';
        const cronCommand = '(crontab -l; echo "' + cronRecord + '") > cron.tab; crontab cron.tab; rm cron.tab';
        console.log(cronCommand);
        exec(cronCommand, callback);
    },
    compile: function (nativeCode, closure) {
        let closureCode = "";
        if (closure) {
            for (let variable in closure) {
                const value = closure[variable];
                closureCode += 'const ' + variable + ' = \'' + value + '\';';
            }
        }
        let code = closureCode + nativeCode;
        code = code.replace(/\r/g, '');
        code = code.replace(/\n/g, '');
        code = code.replace(/\) {	/g, '){');
        code = code.replace(/\"/g, '\\\"');
        code = code.replace(/!/g, '\\!');
        code = code.replace('function(){', '');
        code = code.replace('function () {', '');
        code = code.substring(0, code.length - 1);
        code = 'echo \"' + code + '\" | /usr/local/bin/node';
        return code;
    },
    _export: function (code) {
        const identifier = uuid();
        const path = process.cwd() + '/cron-' + identifier + '.sh';
        fs.writeFileSync(path, code, {
            encoding: "utf8",
            mode: 0o755,
            flag: "a+"
        });
        return path;
    }
};
