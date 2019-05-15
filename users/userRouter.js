const express = require('express');
const USER_DB = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {

});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', async (req, res) => {
    try {
        const users = await USER_DB.get();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({ message: 'Error retrieving users!' });
    }
});

router.get('/:id', validateUserId, (req, res) => {

});

router.get('/:id/posts', validateUserId, (req, res) => {

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

};

module.exports = router;
