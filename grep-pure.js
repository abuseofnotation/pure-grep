module.exports = (input, args) => 
    input.split('\n')
        .filter((row) => row.includes(args.pattern))
        .join('\n')
