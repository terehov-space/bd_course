import DB from '../../../functions/DB'

const { Router } = require('express')

const router = Router()

router.get('/admin/tasks', async function (req, res, next) {
  res.json(await DB('SELECT t.id, t.description, t.title, w.id AS workerId, CONCAT(w.firstName, " ", w.lastName) AS worker, t.grade, SUM(tm.hours) AS hours, CASE WHEN t.grade > hours THEN "хорошо" WHEN hours - t.grade < t.grade / 2 THEN "плохо" ELSE "ужасно" END AS performance FROM tasks AS t LEFT JOIN workers AS w ON w.id = t.workerId LEFT JOIN time_management AS tm ON tm.taskId = t.id GROUP BY t.id', []))
})

router.get('/admin/tasks/workers', async function (req, res, next) {
  res.json(await DB('SELECT id, CONCAT(firstName, " ", lastName) AS title FROM workers', []))
})

router.post('/admin/tasks', async function (req, res, next) {
  const insertData = [
    req.body.title,
    req.body.description,
    req.body.workerId,
    req.body.grade
  ]

  await DB('INSERT INTO tasks (title, description, workerId, grade) VALUES (?, ?, ?, ?)', insertData)

  res.json({ error: false })
})

router.put('/admin/tasks', async function (req, res, next) {
  const updateData = [
    req.body.title,
    req.body.description,
    req.body.workerId,
    req.body.grade,
    req.body.id
  ]

  await DB('UPDATE tasks SET title = ?, description = ?, workerId = ?, grade = ? WHERE id= ?', updateData)

  res.json({ error: false })
})

module.exports = router
