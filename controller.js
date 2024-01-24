//Note: controller ini bisa dipisah pisah lagi sesuai konteks seperti user sendiri, product sendiri, order sendiri. Jangan dicampur seperti ini

const { formatRes } = require('./reformat')
const { user, item, order } = require("./models");
const jwt = require('jsonwebtoken')

class Controller {
    //Note: Jika pakai async await, selalu usahakan pakay try-catch
    static async getAllProducts(req, res) {
        const items = await item.findAll();
        //Note: console.log tidak terpakai bisa dihapus saja
        console.log(items.every(iii => iii instanceof item));
        return res.status(200).json(formatRes(items))
    }
    static async getAllUsers(req, res) {
        const users = await user.findAll();
        console.log(users.every(uuu => uuu instanceof user));
        return res.status(200).json(formatRes(users))
    }
    static async getAllOrder(req, res) {
        const orders = await order.findAll();
        console.log(orders.every(ooo => ooo instanceof order));
        return res.status(200).json(formatRes(orders))
    }

    static async getProductById(req, res) {
        try {
            let id = +req.params.id;
            let barang = await item.getById(id)
            if (!barang) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
            return res.status(200).json(formatRes(barang))
        } catch (err) {
            //Note: Pada dasarnya perlu mapping atau validasi lebih untuk menentukan sebuah error apakah memiliki status code tertentu seperti 400 atau 500. Bisa dipertimbangkan untuk melakukan mapping status code untuk error error yang mungkin terjadi. Note ini berlaku untuk endpoint lain
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
    static async getUserById(req, res) {
        try {
            let id = +req.params.id;
            let usr = await user.getById(id)
            if (!usr) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
            return res.status(200).json(formatRes(usr))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
    static async getOrderById(req, res) {
        try {
            let id = +req.params.id;
            let ord = await order.getById(id)
            if (!ord) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
            return res.status(200).json(formatRes(ord))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
    static async getOrderByIdDetail(req, res) {
        try {
            let id = +req.params.id;
            let ord = await order.getById(id)
            let usr = await user.getById(ord.user_id)
            let itm = await item.getById(ord.item_id)
            let data = {
                full_name: usr.full_name,
                item_name: itm.item_name,
                quantity: ord.quantity_order,
                price: itm.item_price,
                shipmentTo: usr.address
            }
            return res.status(200).json(formatRes(data))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }

    static registerUser(req, res) {
        let { full_name, address, email, password } = req.body

        //Note: Tidak disarankan menyimpan password langsung ke database tanpa enkripsi. Bisa pakai library bcryptjs
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

    static async login(req, res) {
        //code here lmao;
        const email = req.body.email.trim();
        const password = req.body.password.trim();
        try {
            let usr = await user.findOne({ where: { email: email } });
            if (password !== usr.password) {
                console.log("Auth: Password Incorrect!");
                return res.status(422).json(formatRes(null, "Incorrect password!"))
            }

            let data = {
                token: jwt.sign({
                    data: {
                        full_name: usr.full_name,
                        email: usr.email,
                    }
                }, 'secret', { expiresIn: '1h' })
            }

            return res.status(200).json(formatRes(data))

        } catch (err) {
            return console.error(err);
        }
    }

    static createOrder(req, res) {
        let { user_id, item_id, quantity_order } = req.body

        let data = {
            user_id: user_id,
            item_id: item_id,
            quantity_order: quantity_order,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        //Note: Apakah tidak ada proses pengurangan stock item setelah order dibuat?
        order.create(data).then((result) => {
            console.log(result.dataValues);
        }).catch((err) => console.error(err))

        return res.status(201).json(formatRes(data));
    }

    static async updateOrder(req, res) {
        let id = +req.params.id;
        let ord = await order.getById(id)
        try {

            let { user_id, item_id, quantity_order } = req.body

            ord.user_id = user_id ? user_id : ord.user_id
            ord.item_id = item_id ? item_id : ord.item_id
            ord.quantity_order = quantity_order ? quantity_order : ord.quantity_order

            //Note: kalau sudah pakai await tidak perlu .then lagi
            await order.update({ user_id, item_id, quantity_order }, {
                where: { id: id }
            })
                .then(() => console.log("Successfully updated! 1"))
                .catch((err) => {
                    console.error(err)
                })

            return res.status(200).json(formatRes(ord, "Successfully updated! 2"))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
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
        
        // res.status harusnya didalam then jika tidak pakai async await
        return res.status(201).json(formatRes(data));
    }

    static async updateProductById(req, res) {
        let id = +req.params.id;
        let barang = await item.getById(id)
        try {

            let { item_name, item_price, item_stock } = req.body

            barang.item_name = item_name ? item_name : barang.item_name
            barang.item_price = item_price ? item_price : barang.item_price
            barang.item_stock = item_stock ? item_stock : barang.item_stock

            //Note: kalau sudah pakai await tidak perlu .then lagi
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

            //Note: kalau sudah pakai await tidak perlu .then lagi
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
        //Note: promise ini harusnya didalam try juga
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
        //Note: promise ini harusnya didalam try juga
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
    static async deleteOrder(req, res) {
        let id = +req.params.id;
        //Note: promise ini harusnya didalam try juga
        let ord = await order.getById(id)
        try {
            await order.destroy({
                where: {
                    id,
                }
            });
            if (!ord) return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
            return res.status(200).json(formatRes(ord, "Successfully deleted!"))
        } catch (err) {
            return res.status(404).json(formatRes(null, `id ${req.params.id} not found!`))
        }
    }
}
module.exports = { Controller }