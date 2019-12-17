'use strict';

const express = require('express');
const todoRoutes = express.Router();
const todo = require('./todo');
const {check, validationResult} = require('express-validator');

todoRoutes.get('/todo',function (req, res, next) {
    todo.find({}, function (err, todos) {
        console.log("Not working")
        if(err){
            return next(new Error(err))
        }
        return res.json(todos)
    })
});

todoRoutes.post('/todo',
    // [
    // check("name").not().isEmpty().trim().escape(),
    // check("timeToWork").isDate
// ],
    function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    todo.create(
        {
            name: req.body.name,
            done:false,
            timeToWork: req.body.timeToWork
        },
        function (error, todo) {
            if(error){
                res.status(400).send("Unable to create the tod list " + error)
            }
            res.status(200).json(todo)

        }
    )
});

todoRoutes.route("/todo/:id").put(function (req, res, next) {
    let id = req.params.id;
    todo.findById(id, function (error, todo) {
        if(error){
            return next(new Error("Todo was not found"))
        }else {
            todo.name = req.body.name;
            todo.done = req.body.done;
            todo.timeToWork= req.body.timeToWork;

            todo.save(
                function (error, todo){
                    if(error){
                        res.status(400).send("Unable to save")
                    }else {
                        res.status(200).json(todo)
                    }
                }
            )
        }
    })
});

todoRoutes.route('/todo/:id').delete(function (req, res, next) {
    let id = req.params.id;
    todo.findByIdAndRemove(id, function (error, todo) {
        if (error){
            return next(new Error("Todo was not found"))
        }
        res.json("Successfully removed")
    })

});

module.exports = todoRoutes;