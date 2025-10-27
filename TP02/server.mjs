import express from 'express'
import webApi from './foccacia-web-api.mjs'

const app = express()

app.use(express.json())

app.get("/competitions", webApi.getcompetitions)