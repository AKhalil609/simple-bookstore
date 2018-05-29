const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Genre = require('./models/genre');
const Book = require('./models/book');


const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore');
var db = mongoose.connection;

app.get('/',(req,res) =>{
    res.send('Please user /api/books or /api/genres');
});

//GET /genres
app.get('/api/genres',(req, res)=>{
    Genre.getGenres((err, genres)=>{
        if(err) throw err;

        res.json(genres);
    })
});

//POST /genres (add)
app.post('/api/genres', (req, res) => {
    var genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if (err) throw err;

        res.json(genre);
    })
});

//UPDATE /genres
app.put('/api/genres/:id', (req, res) => {
    var genre = req.body;
    var id = req.params.id;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if (err) throw err;

        res.json(genre);
    })
});

//DELETE /genre
app.delete('/api/genres/:_id', (req, res) => {
    var id = req.params._id;

    Genre.deleteGenre(id, (err, genre) => {
        if (err) throw err;

        res.json(genre);
        
    })
});

// GET /books
app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) => {
        if (err) throw err;
        console.log(books);
        
        res.json(books);
    })
});

// GET /books by ID
app.get('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    
    Book.getBooksById(id ,(err, books) => {
        if (err) throw err;

        res.json(books);
    })
});

// POST /book
app.post('/api/books',(req,res)=>{
    var book = req.body;
    Book.addBook(book, (err, book)=>{
        if (err) throw err;

        res.json(book);
    })
})

//UPDATE /book
app.put('/api/books/:id', (req, res) => {
    var book = req.body;
    var id = req.params.id;
    Book.updateBook(id, book, {}, (err, book) => {
        if (err) throw err;

        res.json(book);
    })
});

//DELETE /book
app.delete('/api/books/:_id', (req, res) => {
    var id = req.params._id;

    Book.deleteBook(id, (err, book) => {
        if (err) throw err;
        res.json(book);
    })
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});