var mongoose =  require('mongoose');

var genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }

});

var Genre = module.exports = mongoose.model('Genre',genreSchema);

// Get Genres
module.exports.getGenres = (callback, limit)=>{
    Genre.find(callback).limit(limit);
}
// Add Genre
module.exports.addGenre = (data, callback) => {
    Genre.create(data, callback);
}
// Update Genre
module.exports.updateGenre = (id, data, options, callback) => {
    var query = {_id: id};
    var update = {
        name: data.name
    }
    Genre.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteGenre = (id, callback) => {
    var query = {_id: id}
    Genre.findOneAndDelete(query, callback);
}