const simpleGrep = require('./grep-pure')

module.exports = (args) => {
    if (args.file !== undefined) {
        return {
            action: 'readFile',
            arguments: {file: args.file},
            callback: (contents) => simpleGrep(contents, {pattern: args.pattern})
        }
    } else {
        return {
            action: 'readStdin',
            arguments: {},
            callback: (input) => simpleGrep(input, args) 
        }
    }
}
