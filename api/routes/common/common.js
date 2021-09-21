import DB from '../../../functions/DB'

const { Router } = require('express')

const router = Router()

router.post('/login', async function (req, res, next) {
  if (req.body.login === process.env.AD_USER &&
        req.body.password === process.env.AD_PASS) {
    res.json({ isAdmin: true, worker: null })
  } else {
    const workers = await DB('SELECT * FROM workers WHERE phone = ? AND lastName = ? LIMIT 1', [req.body.login, req.body.password])

    if (workers.length > 0) {
      res.json({ isAdmin: false, worker: workers[0] })
    } else {
      res.json({ isAdmin: false, worker: null })
    }
  }
})

module.exports = router
