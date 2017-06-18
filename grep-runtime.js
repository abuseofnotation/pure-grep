module.exports = (f) => {
    const args = require('minimist')(process.argv.slice(2))
    require('get-stdin')().then((input) => {
        console.log(f(input, Object.freeze(args)))
    })
}
