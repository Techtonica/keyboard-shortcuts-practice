module.exports = {
    entry: [ "./public/scripts/main.js","./public/scripts/keymaster.js" ],
    target: 'browser',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        libraryTarget: 'var',
        library: 'ui'
    },
    
    mode: "development",
}