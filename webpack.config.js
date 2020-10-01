module.exports = {
    entry: ["./public/scripts/history.js", "./public/scripts/confetti.js", "./public/scripts/main.js","./public/scripts/keymaster.js" ],
    target: 'node',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    
    mode: "development",
}