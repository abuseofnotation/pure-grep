const simpleGrep = require('./grep-pure')
const createAction = (action) => (arguments) => ({ action, arguments })
const readFile = createAction('readFile')
const readStdin = createAction('readStdin')
const print = createAction('print')

module.exports = function*(args) {
    let input;
    if (args.file !== undefined) {
        input = yield readFile({file: args.file})
    } else {
        input = yield readStdin()
    }
    yield print({ string: simpleGrep(input, {pattern: args.pattern}) })
}
