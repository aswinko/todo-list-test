const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.listen(2000, () => {
    console.log('Server is running at http://localhost:2000');
})