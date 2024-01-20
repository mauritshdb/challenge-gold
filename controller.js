const dataProducts = require('./database/products.json')
const dataUsers = require('./database/users.json')
const fs = require("fs")
const { formatRes } = require('./reformat')
const { user, item } = require("./models")
const { where } = require('sequelize')

class Controller {
    static async getAllProducts(req, res) {
        const items = await item.findAll();
        console.log(items.every(iii => iii instanceof item));
        return res.status(200).json(formatRes(items))
    }
    static async getAllUsers(req, res) {
        const users = await user.findAll();
        console.log(users.every(uuu => uuu instanceof user));
        return res.status(200).json(formatRes(users))
    }

    static async getProductById(req, res) {
        try {
            let id = +req.params.id;
            let barang = await item.getById(id)
            return res.status(200).json(formatRes(barang))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
    static async getUserById(req, res) {
        try {
            let id = +req.params.id;
            let usr = await user.getById(id)
            return res.status(200).json(formatRes(usr))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }

    static registerUser(req, res) {
        let { full_name, address, email, password } = req.body

        let data = {
            full_name: full_name,
            address: address,
            email: email,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        user.create(data).then((result) => {
            console.log(result.dataValues);
        }).catch((err) => console.error(err))

        return res.status(201).json(formatRes(data))
    }

    static addProduct(req, res) {
        let { item_name, item_price, item_stock } = req.body

        let data = {
            item_name: item_name,
            item_price: item_price,
            item_stock: item_stock,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        item.create(data).then((result) => {
            console.log(result.dataValues);
        }).catch((err) => console.error(err))

        return res.status(201).json(formatRes(data))
    }

    static async updateProductById(req, res) {
        let id = +req.params.id;
        let barang = await item.getById(id)
        try {

            let { item_name, item_price, item_stock } = req.body

            barang.item_name = item_name ? item_name : barang.item_name
            barang.item_price = item_price ? item_price : barang.item_price
            barang.item_stock = item_stock ? item_stock : barang.item_stock

            await item.update({ item_name, item_price, item_stock }, {
                where: { id: id }
            })
                .then(() => console.log("Successfully updated!"))
                .catch((err) => {
                    console.error(err)
                })

            return res.status(200).json(formatRes(barang, "Successfully updated!"))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }


        // let id = +req.params.id, statusCode = 200
        // const data = dataProducts.find(i => i.id === +id)

        // if(data === undefined) {
        //     statusCode = 404
        //     message = `Product with id ${req.params.id} not found.`
        //     return res.status(statusCode).json(formatRes(data, message))
        // }

        // let {name, category, price, stock} = req.body
        // data.name = name ? name : data.name
        // data.category = category ? category : data.category
        // data.price = price ? price : data.price
        // data.stock = stock ? stock : data.stock

        // for (let i = 0; i < dataProducts.length; i++) {
        //     if(dataProducts[i].id === id) {
        //         dataProducts[i] = data
        //         break
        //     }
        // }

        // fs.writeFileSync("./database/products.json", JSON.stringify(dataProducts), "utf-8")


        // return res.status(statusCode).json(formatRes(data))
    }
    static updateUserById(req, res) {
        let id = +req.params.id, statusCode = 200
        const data = dataUsers.find(i => i.id === +id)

        if (data === undefined) {
            statusCode = 404
            message = `User with id ${req.params.id} not found.`
            return res.status(statusCode).json(formatRes(data, message))
        }

        let { username, password } = req.body
        data.username = username ? username : data.username
        data.password = password ? password : data.password

        for (let i = 0; i < dataUsers.length; i++) {
            if (dataUsers[i].id === id) {
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

        if (data === undefined) {
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

        if (data === undefined) {
            statusCode = 404
            message = `User with id ${id} not found.`
        }
        let temp = dataUsers.filter(pst => pst.id !== id)
        fs.writeFileSync("./database/users.json", JSON.stringify(temp), "utf-8")
        return res.status(statusCode).json(formatRes())
    }
}
module.exports = { Controller }