const express = require("express")
require('dotenv').config()
const app = express() /* () significa ejecutar */



app.get("/",(req,res) => {
     console.log("<h1>peticion recibida</h1>")

     res.send("Here you can see")
})

const PORT = process.env.PORT || 4000

app.listen(PORT,()=> {
    console.log(`Servidor escuchando en puerto ${PORT}`) /*backticks `` instead of "" or '' */
})