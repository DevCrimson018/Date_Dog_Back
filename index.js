const express = require("express")
require("dotenv").config()
require("./config/db")
const cors = require("cors")
const app = express()

//Configs
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : false}))



//Routes
app.use("/api", require("./routes/api"))

const PORT = process.env.PORT ||3000

app.listen(PORT, () => {
    console.log(`Estas en el puerto ${PORT}`);
})