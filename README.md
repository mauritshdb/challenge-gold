# challenge-gold

This is my first time building a REST API with javascript and with Sequelize

api endpoint:
`/api/v1/`

### post or create

post register user: 
`/api/v1/adduser`
```
{
    "full_name": "John papa",
    "address": "Jakarta Indonesia",
    "email": "jognpapap@email.com",
    "password": "password"
}
```

post add product: 
`/api/v1/addproduct`
```
{
    "item_name": "Outside Outmilk",
    "item_price": 4.49,
    "item_stock": 16
}
```

### get, put, delete

get all users:
`/api/v1/users`

get all products/items:
`/api/v1/products`

get,put,delete user by id:
`/api/v1/users/:id`
```
{
    "full_name": "Steve Jobless",
    "address": "US, Isolated Island",
    "email": "steveee@gmail.com",
    "password": "password"
}
```

get,put,delete product by id:
`/api/v1/products/:id`
```
{
    "item_name": "Indomie kaldu ayam",
    "item_price": 0.40,
    "item_stock": 420
}
```

[postman json library](https://raw.githubusercontent.com/mauritshdb/challenge-gold/main/Binar%20Gold.postman_collection.json)