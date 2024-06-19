const { Sequelize, Model } = require('sequelize')
const usermodel = require('./model/user')
const groceriesmodel = require('./model/groceries')
const breakfastmodel = require('./model/breakfast')
const householdModel = require('./model/household')
const funpartyModel = require('./model/fun_party')
const pickelsModel = require('./model/pickels')
const sweets_savouries_Model = require('./model/sweets_savouries')
const fruitsModel = require('./model/fruits')
const riceModel = require('./model/rice')
const poojaModel = require('./model/pooja')
const vegetablesModel = require('./model/vegetables')
const beveragesModel = require('./model/beverages')
const categoriesModel = require('./model/categories')
const sub_categoriesModel = require('./model/sub_categories')
const spicesModel = require('./model/spices')
const cartModel = require('./model/cart')
const orderModel = require('./model/orders')
const walletModel = require('./model/wallet')
const contactModel = require('./model/contact')


const sequelize = new Sequelize(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_PROVIDER,
    }
)

const user = usermodel(sequelize)
const groceries = groceriesmodel(sequelize)
const breakfast = breakfastmodel(sequelize)
const household = householdModel(sequelize)
const funparty = funpartyModel(sequelize)
const pickels = pickelsModel(sequelize)
const sweets_savouries =sweets_savouries_Model(sequelize)
const fruits = fruitsModel(sequelize)
const rice = riceModel(sequelize)
const pooja = poojaModel(sequelize)
const vegetables = vegetablesModel(sequelize)
const beverages = beveragesModel(sequelize)
const categories = categoriesModel(sequelize)
const sub_categories = sub_categoriesModel(sequelize)
const spices = spicesModel(sequelize)
const cart = cartModel(sequelize)
const order = orderModel(sequelize)
const wallet = walletModel(sequelize)
const contact = contactModel(sequelize)






const createtable = () => {
    try {
        sequelize.authenticate();

        user.sync({ alter: false })
        groceries.sync({ alter: false })
        breakfast.sync({ alter: false })
        household.sync({ alter: false })
        funparty.sync({ alter: false })
        pickels.sync({ alter: false })
        sweets_savouries.sync({ alter: false })
        fruits.sync({ alter: false })
        rice.sync({ alter: false })
        pooja.sync({ alter: false })
        vegetables.sync({ alter: false })
        beverages.sync({ alter: false })
        categories.sync({ alter: false })
        sub_categories.sync({ alter: false })
        spices.sync({ alter: false })
        cart.sync({ alter: false })
        order.sync({ alter: false })
        wallet.sync({ alter: false })
        contact.sync({ alter: false })







        console.log("table created")

    }
    catch (error) {
        console.log("error" + error)
    }
}

module.exports = { sequelize, createtable }