const fs = require('fs')

module.exports = (f) => {
    const args = require('minimist')(process.argv.slice(2))

    const result = (f(Object.freeze(args)))

    if(result.action === 'readFile'){
        fs.readFile(result.arguments.file, 'utf8', function (err,data) {
            console.log(result.callback(data))
        })
    } else if (result.action === 'readStdin'){
        require('get-stdin')().then((input) => {
            console.log(result.callback(input))
        })
    } else {
        throw new Error('Invalid action')
    }
}
