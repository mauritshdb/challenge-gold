const express = require("express")
const rooter = express.Router()

const { Controller } = require("../controller.js")

rooter.route("/products").get(Controller.getAllProducts).post(Controller.addProduct)
rooter.route("/products/:id").get(Controller.getProductById).put(Controller.updateProductById).delete(Controller.deleteProduct)

rooter.route("/addproduct").post(Controller.addProduct)
rooter.route("/adduser").post(Controller.registerUser)
rooter.route("/createorder").post(Controller.createOrder)
rooter.route("/orders").get(Controller.getAllOrder)
rooter.route("/updateorder").put(Controller.updateOrder)

rooter.route("/users").get(Controller.getAllUsers)
rooter.route("/users/:id").get(Controller.getUserById).put(Controller.updateUserById).delete(Controller.deleteUser)

module.exports = { rooter }