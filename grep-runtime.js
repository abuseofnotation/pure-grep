const fs = require('fs')

const processResult = (result) => {

    if (result.action === 'readFile') {
        fs.readFile(result.arguments.file, 'utf8', function (err,data) {
            if (result.callback !== undefined) {
                processResult(result.callback(data))
            }
        })
    } else if (result.action === 'readStdin'){
        require('get-stdin')().then((input) => {
            if (result.callback !== undefined) {
                processResult(result.callback(input))
            }
        })
    } else if (result.action === 'print'){
        console.log(result.arguments.string)
        if (result.callback !== undefined) {
            processResult(result.callback())
        }
    } else {
        throw new Error('Invalid action')
    }
}

module.exports = (f) => {
    const args = require('minimist')(process.argv.slice(2))
    processResult(f(Object.freeze(args)))
}
