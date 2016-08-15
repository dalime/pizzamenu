var express = require('express');
var router = express.Router();

let Pizza = require('../models/pizza'); //require in Model

// pizzas route
// base url: /pizzas

// EXPRESS ROUTES

// GET ALL
router.get('/', (req, res) => {
  Pizza.find({}, (err, pizzas) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(pizzas);
    }
  });
});

// GET ONE
router.get('/:id', (req, res) => {

  // Pizza.findOne({_id: req.params.id}, (err, pizza) => {
  //
  // })
  // THESE TWO ARE SAME
  Pizza.findById(req.params.id, (err, pizza) => {
    if(err || !pizza) {
      res.status(400).send(err || 'Pizza not found.');
    } else {
      res.send(pizza);
    }
  });

});

// CREATE
router.post('/', (req, res) => {
  let pizza = new Pizza(req.body);

  pizza.save((err, savedPizza) => {
    res.status(err ? 400 : 200).send(err || savedPizza);
  });
});

// Pizza.findByIdAndRemove()
// Pizza.findByIdAndUpdate(id, {$set: req.body}, err => {
//
// })

// DELETE
router.delete('/:id', (req, res) => {
  Pizza.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400 : 200).send(err || `Pizza #${req.params.id} was removed!`);
  })
})

// UPDATE
router.put('/:id', (req, res) => {
  Pizza.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
    res.status(err ? 400: 200).send(err || req.body);
  });
})

module.exports = router;
