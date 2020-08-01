const fs = require('fs');
const exec = require('child_process').exec;
module.exports = {
    execute: function (code, callback) {
        if ('function' === typeof code) {
            code = this.compile(code);
        }
        exec(code, callback);
    },
    delete: function (identifier, callback) {
        const fileName = this._fileName(identifier);
        fs.unlink(fileName, callback);
    },
    schedule: function (identifier, pattern, code, callback) {
        if ('function' === typeof code) {
            code = this.compile(code);
        }
        const path = this._export(identifier, code);
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
                let serializer = {
                    value
                };
                serializer = JSON.stringify(serializer);
                serializer = serializer.substring(10, serializer.length - 2);
                closureCode += 'const ' + variable + ' = \'' + serializer + '\';';
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
    _fileName: function (identifier) {
        return process.cwd() + '/cron-' + identifier + '.sh';
    },
    _export: function (identifier, code) {
        const path = this._fileName(identifier);
        fs.writeFileSync(path, code, {
            encoding: "utf8",
            mode: 0o755,
            flag: "a+"
        });
        return path;
    }
};
