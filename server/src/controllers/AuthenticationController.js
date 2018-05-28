const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
// const {inspect} = require('util')

function jwtSignUser (user) {
  // const ONE_DAY = 60 * 60 * 24
  const ONE_DAY = '1m'
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY
  })
}

module.exports = {
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      // console.log(`user: ${inspect(user)}`)
      if (!user) {
        return res.status(403).send({
          error: `The user is not exists`
        })
      }
      if (password !== user.password) {
        return res.status(403).send({
          error: `The login information was not correct`
        })
      }

      const userJson = user.dataValues
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        errer: `An error has occured trying to log in: ${err}`
      })
    }
  }
  // ,
  // async a (req, res) {
  //   const {a} = req.body
  //   console.log(a)
  //   let aa = [{
  //     'a': 'a'
  //   }]
  //   res.send({
  //     user: aa
  //   })
  // }
}
