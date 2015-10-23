module.exports = function() {
    var config = {

        // all js to vet
        alljs: [
            './ext-modules/**/*.js',
            './*.js'
        ]
    };

    return config;
};
