# challenge-gold

This is my first time building a REST API with javascript and with Sequelize

api endpoint:
`/api/v1/`

### post or create

post register user: 

`/api/v1/adduser`

request header
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

request header
```
{
    "item_name": "Outside Outmilk",
    "item_price": 4.49,
    "item_stock": 16
}
```
post create order:

`/api/v1/createorder`

request header
```
{
    "user_id": <user id from table users>,
    "item_id": <item id from table items>,
    "quantity_order": <quantity amount>
}
```

### get, put, delete

get all users:

`/api/v1/users`

get all products/items:

`/api/v1/products`

## get,put,delete user by id:

`/api/v1/users/:id`

request header
```
{
    "full_name": "Steve Jobless",
    "address": "US, Isolated Island",
    "email": "steveee@gmail.com",
    "password": "password"
}
```
request params
request params
```
{
    "id": <user id>
}
```

## get,put,delete product by id:
`/api/v1/products/:id`

request header
```
{
    "item_name": "Indomie kaldu ayam",
    "item_price": 0.40,
    "item_stock": 420
}
```

## login

`/api/v1/login`
request header
```
{
    "email":"youremail@email.com",
    "password":"yourpassword"
}
```
result ok 200
```
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZ1bGxfbmFtZSI6ImpvaG4gZG9lIiwiZW1haWwiOiJqb2huZG9lQGVtYWlsLmNvbSJ9LCJpYXQiOjE3MDY4ODM0MDgsImV4cCI6MTcwNjg4NzAwOH0.kHIrfsyNKExG1eweCuM7R0V12uTZHGz5O0oXkIR2XEo"
    },
    "message": "success"
}
```
result email not registered status 422
```
{
    "data": null,
    "message": "Incorrect email!"
}
```
result incorrect password status 422
```
{
    "data": null,
    "message": "Incorrect password!"
}
```

[postman json library](https://raw.githubusercontent.com/mauritshdb/challenge-gold/main/Binar%20Gold.postman_collection.json)