var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    author:{
        type: String,
        required: true
    },
    publisher:{
        type: String
    },
    description:{
        type: String
    },
    pages:{
        type: Number
    },
    image_url:{
        type: String
    },
    buy_url:{
        type: String
    }

});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books

module.exports.getBooks = (callback, limit) => {
    Book.find(callback).limit(limit);
}

module.exports.getBooksById = (id, callback) => {
    Book.findById(id ,callback);
}

module.exports.addBook = (book, callback) => {
    Book.create(book, callback);
}

module.exports.updateBook = (id, data, options, callback) => {
    var query = { _id: id };
    var update = {
        title: data.title,

        author: data.author,

        publisher: data.publisher,

        description: data.description,

        pages: data.pages,

        image_url: data.image_url,

        buy_url: data.buy_url
    }
    Book.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteBook = (id, callback) => {
    var query = { _id: id }
    Book.findOneAndDelete(query, callback);
}