const { formatRes } = require('./reformat')
const { user, item } = require("./models")

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
            if (!barang) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
            return res.status(200).json(formatRes(barang))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
    static async getUserById(req, res) {
        try {
            let id = +req.params.id;
            let usr = await user.getById(id)
            if(!usr) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
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
    }
    static async updateUserById(req, res) {
        let id = +req.params.id;
        let usr = await user.getById(id)
        try {

            let { full_name, address, email, password } = req.body

            usr.full_name = full_name ? full_name : usr.full_name
            usr.address = address ? address : usr.address
            usr.email = email ? email : usr.email
            usr.password = password ? password : usr.password

            await user.update({ full_name, address, email, password }, {
                where: { id: id }
            })
                .then(() => console.log("Successfully updated!"))
                .catch((err) => {
                    console.error(err)
                })

            return res.status(200).json(formatRes(usr, "Successfully updated!"))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }

    static async deleteProduct(req, res) {
        let id = +req.params.id;
        let barang = await item.getById(id)

        try {
            await item.destroy({
                where: {
                    id,
                }
            });
            if (!barang) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
            return res.status(200).json(formatRes(barang, "Successfully deleted!"))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
    static async deleteUser(req, res) {
        let id = +req.params.id;
        let usr = await user.getById(id)

        try {
            await user.destroy({
                where: {
                    id,
                }
            });
            if (!usr) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
            return res.status(200).json(formatRes(usr, "Successfully deleted!"))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
}
module.exports = { Controller }