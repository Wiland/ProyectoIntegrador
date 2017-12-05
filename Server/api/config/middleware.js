module.exports = function (req, res, next) {
    console.log('LOGGED');
    next();
};
