import DB from '../../../functions/DB'

const { Router } = require('express')

const router = Router()

router.get('/admin/time', async function (req, res, next) {
  res.json(await DB('SELECT tm.id, tm.statusId, s.title AS statusTitle, tm.comment, tm.hours, CONCAT(w.firstName, " ", w.lastName) AS worker, t.title FROM time_management AS tm LEFT JOIN workers AS w ON w.id = tm.workerId LEFT JOIN tasks AS t ON t.id = tm.taskId LEFT JOIN statuses AS s ON s.id=tm.statusId', []))
})

router.put('/admin/time/:id', async function (req, res, next) {
  await DB('UPDATE time_management SET statusId = 3 WHERE id = ?', [req.params.id])

  res.json({ error: false })
})

router.delete('/admin/time/:id', async function (req, res, next) {
  await DB('UPDATE time_management SET statusId = 2 WHERE id = ?', [req.params.id])

  res.json({ error: false })
})

router.get('/admin/time/bad', async function (req, res, next) {
  res.json(await DB('SELECT CONCAT(w.firstName, " ", w.lastName) AS worker, SUM(tm.hours) AS hours FROM workers AS w LEFT JOIN time_management AS tm ON tm.workerId = w.id WHERE tm.id IN (SELECT id FROM time_management AS t WHERE t.statusId = 2) GROUP BY w.id', []))
})

module.exports = router
