const express = require("express")
const path = require('path') /*método de nodejs para evitar problemas con las "/" */
require('dotenv').config()
const mongoose = require("mongoose")
const app = express() /* () significa ejecutar */

mongoose.connect(
    `mongodb+srv://juanfernandezborasio:${process.env.MONGO_DB_PASS}@stock-simplex.7z8ibeu.mongodb.net/?retryWrites=true&w=majority`
    )
    .then (result => console.log("Conexión exitosa a BD"))
    .catch((err)=> console.log(err))

const productSchema = mongoose.Schema(
        {
            name : {type: String, required: true },
            price: Number,
        },
        {
            timestamps:true
        }
    
    )

app.use(express.json())

app.post('/api/v1/products', (req,res,next) => {

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
    })
    newProduct
    .save()
    .then(result => {
        res.status(201).json({ok:true})
    })
    .catch((err)=> console.log(err))
    
})



const Product = mongoose.model('Product',productSchema)


app.use(express.static(path.join(__dirname, 'public'))) 

/*app.get("/",(req,res,next) => {
     console.log('<h1>peticion recibida</h1>')
     next()

})*/

const PORT = process.env.PORT || 4000

app.listen(PORT,()=> {
    console.log(`Servidor escuchando en puerto ${PORT}`) /*backticks `` instead of "" or '' */
})