var mongoose = require('mongoose');

var todo = new mongoose.Schema({
        name: {
            type: String
        },
        done: {
            type: Boolean
        },
        timeToWork: {
            type: Date
        }
    },
    {
        collection: 'todos',
    });


module.exports = mongoose.model("todo", todo);