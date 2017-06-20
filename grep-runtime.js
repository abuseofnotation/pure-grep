const fs = require('fs')

const processResult = (program, {value, done}) => {
    const result = value
    if (!done) {
        if (result.action === 'readFile') {
            fs.readFile(result.arguments.file, 'utf8', function (err,data) {
                    processResult(program, program.next(data))
            })
        } else if (result.action === 'readStdin'){
            require('get-stdin')().then((input) => {
                    processResult(program, program.next(input))
            })
        } else if (result.action === 'print'){
                console.log(result.arguments.string)
                processResult(program, program.next())
        } else {
            throw new Error('Invalid action')
        }
    }
}

module.exports = (f) => {
    const args = require('minimist')(process.argv.slice(2))
    const program = f(Object.freeze(args))
    processResult(program, program.next())
}
