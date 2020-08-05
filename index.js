const express = require("express");
const config = require('config')

const app = express()
const PORT = config.get('port') || 5000

app.listen(5000, ()=> console.log(`App has been started on port ${PORT}`))