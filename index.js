const cors = require("cors")
const bodyParser = require("body-parser")
const express = require("express")
const { router } = require("./Routes")


const port = 3003

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => console.log(`Server running on port ${port}`))