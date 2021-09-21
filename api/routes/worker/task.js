import DB from '../../../functions/DB'

const { Router } = require('express')

const router = Router()

router.post('/worker/tasks', async function (req, res, next) {
  res.json(await DB('SELECT t.id, t.description, t.title, t.grade, SUM(tm.hours) AS hours FROM tasks AS t LEFT JOIN workers AS w ON w.id = t.workerId LEFT JOIN time_management AS tm ON tm.taskId = t.id WHERE t.workerId = ? GROUP BY t.id', [req.body.id]))
})

module.exports = router
