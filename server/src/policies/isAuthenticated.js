const passport = require('passport')

// jwt从client端(../passport.js中传来的JwtStrategy)与server端的jwt比较
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(401).json({
        error: `Please log in first`
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
