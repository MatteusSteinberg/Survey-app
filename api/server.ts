import 'dotenv/config'
import express from 'express'
import { connect } from './lib/db'
import registerRoutes from './routes/register-routes'
import middleware from './services/helpers/middleware'

const app = express()

const port = process.env.PORT || 8080

middleware(app)

registerRoutes(app)

connect()

app.listen(port, () => { console.log(`Listening on port ${port}`) })
