const express = require('express');
const USER_DB = require('./userDb');
const POST_DB = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
    
    try {
        const user = await USER_DB.insert(req.body);
        res.status(201).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Error adding user' });
    }
});

router.post('/:id/post', validateUserId, validatePost, async (req, res) => {
    const user = {...req.body, userId: req.params.id };
    try {
        const post = await POST_DB.insert(user);
        res.status(201).json(post);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Error adding post' });
    }
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

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const deleted = await USER_DB.remove(req.params.id);
        if(!deleted) {
            res.status(400).json({ message: 'Could not remove user' });
        } else {
            res.status(200).json({ message: 'User has been removed' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to delete user' });
    }
});

router.put('/:id', validateUserId, async (req, res) => {
    try {
        const updated = await USER_DB.update(req.params.id, req.body);
        if(updated) {
            res.status(200).json(updated);
        } else {
            res.status(400).json({ message: 'Error updating user information' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to update user' });
    }
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
   
    const name = req.body;
    if(req.body && Object.keys(req.body).length) {
        next();
    } else {
        res.status(404).json({ message: 'missing required name field' });
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

