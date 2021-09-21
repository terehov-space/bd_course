const express = require('express')

// Create express instance
const app = express()

// Require API routes
const ATasks = require('./routes/admin/tasks')
const ATime = require('./routes/admin/time')
const AWorker = require('./routes/admin/worker')

const WTask = require('./routes/worker/task')
const WTime = require('./routes/worker/time')

const Common = require('./routes/common/common')

// Import API Routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Admin routes
app.use(ATasks)
app.use(ATime)
app.use(AWorker)

// Worker routes
app.use(WTask)
app.use(WTime)

// Common routes
app.use(Common)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
