const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all the items
// @access  Public

// we are already in /api/items (see comment above app.use)
router.get('/', (req, res) => {
    // It is a promise  (in sort -1 means descending)
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    CREATE An ITEM
// @access  Public

// we are already in /api/items (see comment above app.use)
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    // This is a promise (currently this is in local memory now save it to the database)
    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    DELETE An ITEM
// @access  Public

// we are already in /api/items (see comment above app.use)
router.delete('/:id', (req, res) => {
    // First find the item with given id
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;