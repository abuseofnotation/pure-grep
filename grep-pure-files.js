const simpleGrep = require('./grep-pure')

module.exports = (args) => {
    if (args.file !== undefined) {
        return {
            action: 'readFile',
            arguments: {file: args.file},
            callback: (contents) => ({
                action: 'print',                
                arguments: {
                    string: simpleGrep(contents, {pattern: args.pattern})
                },
                callback: undefined

            })
        }
    } else {
        return {
            action: 'readStdin',
            arguments: {},
            callback: (input) => ({
                action: 'print',                
                arguments: {
                    string: simpleGrep(input, {pattern: args.pattern})
                },
                callback: undefined

            })
        }
    }
}
