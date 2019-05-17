const express = require('express');

const POST_DB = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await POST_DB.get();
        res.status(200).json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving posts' });
    }
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

async function validatePostId(req, res, next) {
    const { id } = req.params.id;
    const valid = await POST_DB.getById(id);

    if(valid) {
        req.valid = valid;
        next();
    } else {
        res.status(404).json({ message: 'ID not valid' });
    }
};

module.exports = router;
