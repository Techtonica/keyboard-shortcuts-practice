var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello Techtonica from routes js");
    });


    // return module.exports;
}

module.exports = appRouter;
