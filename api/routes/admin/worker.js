import DB from '../../../functions/DB'

const { Router } = require('express')

const router = Router()

router.get('/admin/workers', async function (req, res, next) {
  res.json(await DB('SELECT * FROM workers', []))
})

router.post('/admin/workers', async function (req, res, next) {
  const insertData = [
    req.body.firstName,
    req.body.lastName,
    req.body.phone
  ]

  const phone = await DB('SELECT * FROM workers WHERE phone = ?', [req.body.phone])

  if (phone.length > 0) {
    res.json({ error: 'Такой номер уже есть в базе' })
  } else {
    await DB('INSERT INTO workers (firstName, lastName, phone) VALUES (?, ?, ?)', insertData)
    res.json({ error: false })
  }
})

router.put('/admin/workers/', async function (req, res, next) {
  const updateData = [
    req.body.firstName,
    req.body.lastName,
    req.body.phone,
    req.body.id
  ]

  const phone = await DB('SELECT * FROM workers WHERE phone = ? AND id != ?', [req.body.phone, req.body.id])

  if (phone.length > 0) {
    res.json({ error: 'Такой номер уже есть в базе' })
  } else {
    await DB('UPDATE workers SET firstName = ?, lastName = ?, phone = ? WHERE id = ?', updateData)
    res.json({ error: false })
  }
})

module.exports = router
