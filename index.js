const express = require('express')
const colors = require('colors')
const {rooter} = require('./router/route')
const { Sequelize } = require('sequelize');

const app = express()

app.use(express.json())

app.use("/api/v1/", rooter)


app.listen(3000, () => {
    console.log('[INFO] Server nyala dengan port 3000'.green);
})