const express = require('express');
const USER_DB = require('./userDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
    try {
        const post = await USER_DB.insert(req.name);
        res.status(201).json(post);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Post was unsuccessful' });
    }
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

});

router.get('/', async (req, res) => {
    try {
        const users = await USER_DB.get();
        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving users!' });
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const { id } = await USER_DB.getById(req.params.id);
        if(id) {
            res.status(200).json(req.user);
        } else {
            res.status(404).json({ message: `User with ID: ${id} could not be found`});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Could not retrieve the user with that ID' });
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    try {
        const posts = await USER_DB.getUserPosts(req.params.id);

        res.status(200).json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Could not retrieve posts for that user.' });
    }
});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
    try{
        const { id } = req.params;
        const userId = await USER_DB.getById(id);
        if(userId) {
            req.user = userId;
            next();
        } else {
            res.status(400).json({ message: 'invalid user id' });
            next();
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Error validating user.' });
    }
};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: 'missing user data' });
        next();
    } else if(!req.body.name) {
        res.status(400).json({ message: 'missing required name field' });
        next();
    }
};

function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: 'missing post data' });
        next();
    } else if(!req.body.text) {
        res.status(400).json({ message: 'missing required text field' });
        next();
    }
};

module.exports = router;
