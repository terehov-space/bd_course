import DB from '../../../functions/DB'

const { Router } = require('express')

const router = Router()

router.post('/worker/time', async function (req, res, next) {
  const insertData = [
    req.body.comment,
    req.body.taskId,
    req.body.workerId,
    req.body.hours
  ]

  await DB('INSERT INTO time_management (comment, taskId, workerId, hours) VALUES (?, ?, ?, ?)', insertData)

  res.json({ error: false })
})

module.exports = router
