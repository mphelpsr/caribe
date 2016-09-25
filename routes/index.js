module.exports = function(app) {
    app.get("/", function(req, res) {
        res.json({
            status: "Caribe no ar!"
        })
    });
};
