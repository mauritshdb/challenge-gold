const dataProducts = require('./database/products.json')
const dataUsers = require('./database/users.json')
const fs = require("fs")
const { formatRes } = require('./reformat')

class Controller {
    static getAllProducts(req, res){
        return res.status(200).json(formatRes(dataProducts))
    }
    static getAllUsers(req, res){
        return res.status(200).json(formatRes(dataUsers))
    }

    static getProductById(req, res) {
        let statusCode = 200, message = undefined
        const data = dataProducts.find(i => i.id === +req.params.id)

        if(data === undefined) {
            statusCode = 404
            message = `Product with id ${req.params.id} not found.`
        }
        return res.status(statusCode).json(formatRes(data, message))
    }
    static getUserById(req, res) {
        let statusCode = 200, message = undefined
        const data = dataUsers.find(i => i.id === +req.params.id)

        if(data === undefined) {
            statusCode = 404
            message = `User with id ${req.params.id} not found.`
        }
        return res.status(statusCode).json(formatRes(data, message))
    }

    static registerUser(req, res) {
        let {username, password} = req.body

        let id = dataUsers[dataUsers.length - 1].id + 1

        let data = {
            id: id,
            username: username,
            password: password
        }

        dataUsers.push(data)
        fs.writeFileSync("./database/users.json", JSON.stringify(dataUsers), "utf-8")
        return res.status(201).json(formatRes(data))
    }

    static addProduct(req, res) {
        let {name, category, price, stock} = req.body

        let id = dataProducts[dataProducts.length - 1].id + 1

        let data = {
            id: id,
            name: name,
            category: category,
            price: price,
            stock: stock
        }

        dataProducts.push(data)
        fs.writeFileSync("./database/products.json", JSON.stringify(dataProducts), "utf-8")
        return res.status(201).json(formatRes(data))
    }

    static updateProductById( req, res ){
        let id = +req.params.id, statusCode = 200
        const data = dataProducts.find(i => i.id === +id)

        if(data === undefined) {
            statusCode = 404
            message = `Product with id ${req.params.id} not found.`
            return res.status(statusCode).json(formatRes(data, message))
        }
        
        let {name, category, price, stock} = req.body
        data.name = name ? name : data.name
        data.category = category ? category : data.category
        data.price = price ? price : data.price
        data.stock = stock ? stock : data.stock

        for (let i = 0; i < dataProducts.length; i++) {
            if(dataProducts[i].id === id) {
                dataProducts[i] = data
                break
            }
        }

        fs.writeFileSync("./database/products.json", JSON.stringify(dataProducts), "utf-8")
        return res.status(statusCode).json(formatRes(data))
    }
    static updateUserById( req, res ){
        let id = +req.params.id, statusCode = 200
        const data = dataUsers.find(i => i.id === +id)

        if(data === undefined) {
            statusCode = 404
            message = `User with id ${req.params.id} not found.`
            return res.status(statusCode).json(formatRes(data, message))
        }
        
        let {username, password } = req.body
        data.username = username ? username : data.username
        data.password = password ? password : data.password

        for (let i = 0; i < dataUsers.length; i++) {
            if(dataUsers[i].id === id) {
                dataUsers[i] = data
                break
            }
        }

        fs.writeFileSync("./database/users.json", JSON.stringify(dataUsers), "utf-8")
        return res.status(statusCode).json(formatRes(data))
    }

    static deleteProduct(req, res) {
        let id = +req.params.id, statusCode = 200

        const data = dataProducts.find(i => i.id === +id)

        if (data === undefined){
            statusCode = 404
            message = `Product with id ${id} not found.`
        }
        let temp = dataProducts.filter(pst => pst.id !== id)
        fs.writeFileSync("./database/products.json", JSON.stringify(temp), "utf-8")
        return res.status(statusCode).json(formatRes())
    }
    static deleteUser(req, res) {
        let id = +req.params.id, statusCode = 200

        const data = dataUsers.find(i => i.id === +id)

        if (data === undefined){
            statusCode = 404
            message = `User with id ${id} not found.`
        }
        let temp = dataUsers.filter(pst => pst.id !== id)
        fs.writeFileSync("./database/users.json", JSON.stringify(temp), "utf-8")
        return res.status(statusCode).json(formatRes())
    }
}
module.exports = { Controller }