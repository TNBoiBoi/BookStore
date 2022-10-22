const express = require('express')
// TAL NOOBY NOB
var config = require('./config');
const mongoose = require('mongoose');

const app = express()
const session = require('express-session');
app.use(session({
    secret: 'foo',    
    saveUninitialized: false,
    resave: false
}))
const bodyparser = require('body-parser')
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));  
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Book
const {BookController} = require('./src/controllers')
app.get('/books/list', (req, res) => {BookController.list(req, res)});
app.get('/books/search', (req, res) => {BookController.search(req, res)});
app.post('/books/create', (req, res) => {BookController.create(req, res)});
app.get('/books/:name', (req, res) => {BookController.find(req, res)});
app.post('/books/delete', (req, res) => {BookController.delete(req, res)});
app.post('/books/update', (req, res) => {BookController.update(req, res)});

//Author
const {AuthorController} = require('./src/controllers')
app.get('/author/list', (req, res) => {AuthorController.list(req, res)});
app.get('/author/books/:author', (req, res) => {AuthorController.getAllBooks(req, res)});
app.get('/author/:name', (req, res) => {AuthorController.find(req, res)});
app.post('/author/create', (req, res) => {AuthorController.create(req, res)});
app.post('/author/delete', (req, res) => {AuthorController.delete(req, res)});
app.post('/author/update', (req, res) => {AuthorController.update(req, res)});

//Category
const {CategoryController} = require('./src/controllers')
app.get('/category/list', (req, res) => {CategoryController.list(req, res)});
app.get('/category/books/:name', (req, res) => {CategoryController.getAllBooks(req, res)});
app.get('/category/:name', (req, res) => {CategoryController.find(req, res)});
app.post('/category/create', (req, res) => {CategoryController.create(req, res)});
app.post('/category/delete', (req, res) => {CategoryController.delete(req, res)});
app.post('/category/update', (req, res) => {CategoryController.update(req, res)});

//User
const {UserController} = require('./src/controllers')
app.get('/user/list', (req, res) => {UserController.list(req, res)});
app.get('/user/:name', (req, res) => {UserController.find(req, res)});
app.post('/user/create', (req, res) => {UserController.create(req, res)});
app.post('/user/delete', (req, res) => {UserController.delete(req, res)});
app.post('/user/update', (req, res) => {UserController.update(req, res)});
app.post('/login', (req, res) => {UserController.login(req, res)});
app.post('/foo', (req, res) => {UserController.foo(req, res)});


//Role
const {RoleController} = require('./src/controllers')
app.get('/role/list', (req, res) => {RoleController.list(req, res)});
app.get('/role/admins', (req, res) => {RoleController.getAllAdmins(req, res)});
app.get('/role/users', (req, res) => {RoleController.getAllCustomers(req, res)});
app.get('/role/:name', (req, res) => {RoleController.find(req, res)});
app.post('/role/create', (req, res) => {RoleController.create(req, res)});
app.post('/role/delete', (req, res) => {RoleController.delete(req, res)});
app.post('/role/update', (req, res) => {RoleController.update(req, res)});

//Warehouse
const {WarehouseController} = require('./src/controllers')
app.get('/warehouse/list', (req, res) => {WarehouseController.list(req, res)});
app.get('/warehouse/:coordinates', (req, res) => {WarehouseController.find(req, res)});
app.post('/warehouse/create', (req, res) => {WarehouseController.create(req, res)});
app.post('/warehouse/delete', (req, res) => {WarehouseController.delete(req, res)});
app.post('/warehouse/update', (req, res) => {WarehouseController.update(req, res)});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connect();


function connect() {
    console.log(config.db);
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', connect)
    return mongoose.connect(config.db, {
      keepAlive: true,
      dbName: "test2",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }