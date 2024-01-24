//Note: Router ini bisa dipisah pisah lagi sesuai konteks seperti user sendiri, product sendiri, order sendiri. Jangan dicampur seperti ini

const express = require("express")
const rooter = express.Router()

const { Controller } = require("../controller.js")

rooter.route("/products").get(Controller.getAllProducts).post(Controller.addProduct)
rooter.route("/products/:id").get(Controller.getProductById).put(Controller.updateProductById).delete(Controller.deleteProduct)

rooter.route("/addproduct").post(Controller.addProduct)
rooter.route("/adduser").post(Controller.registerUser)
rooter.route("/createorder").post(Controller.createOrder)
rooter.route("/orders").get(Controller.getAllOrder)
rooter.route("/orders/:id").put(Controller.updateOrder).get(Controller.getOrderById)
rooter.route("/orderdetail/:id").get(Controller.getOrderByIdDetail)

rooter.route("/login").post(Controller.login)



rooter.route("/users").get(Controller.getAllUsers)
rooter.route("/users/:id").get(Controller.getUserById).put(Controller.updateUserById).delete(Controller.deleteUser)

module.exports = { rooter }