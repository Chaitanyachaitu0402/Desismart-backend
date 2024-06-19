require('dotenv').config();
const express = require("express")
const { createtable } = require('./db')
const http = require('http')

const user = require('./route/user')
const groceries = require('./route/groceries')
const breakfast = require('./route/breakfast')
const household = require('./route/household')
const funparty = require('./route/fun_party')
const pickels = require('./route/pickels')
const sweets_savouries = require('./route/sweets_savouries')
const fruits = require('./route/fruits')
const rice = require('./route/rice')
const pooja = require('./route/pooja')
const vegetables = require('./route/vegetables')
const beverages = require('./route/beverages')
const categories = require('./route/categories')
const sub_categories = require('./route/sub_categories')
const spices = require('./route/spices')
const cart = require('./route/cart')
const order = require('./route/orders')
const wallet = require('./route/wallet')
const contact = require('./route/contact')





var cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const { create } = require('domain');

const createtable1 = () => {
    try {
        createtable();
    }
    catch (error) {
        console.log("error", error)
    }
}
createtable1()

const app = express()
app.use(cors())
// app.use(express.json())
// app.use(cookieparser())
app.use(bodyparser.urlencoded({ limit: '100mb', extended: 'true' }))
app.use(bodyparser.json({ limit: '100mb' }))

app.use('/user', user)
app.use('/groceries', groceries)
app.use('/breakfast', breakfast)
app.use('/household', household)
app.use('/fun-party', funparty)
app.use('/pickels', pickels)
app.use('/sweets-savouries', sweets_savouries)
app.use('/fruits', fruits)
app.use('/rice', rice)
app.use('/pooja', pooja)
app.use('/vegetables', vegetables)
app.use('/beverages', beverages)
app.use('/categories', categories)
app.use('/sub-categories', sub_categories)
app.use('/spices', spices)
app.use('/cart', cart)
app.use('/order', order)
app.use('/wallet', wallet)
app.use('/contact', contact)



const port = 3000 || process.env.appport
const sarver = http.createServer(app)
sarver.listen(port, () => {
    console.log("servar is running at port", +port)

});