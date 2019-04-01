const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get tasks
router.get('/', async (req, res) => {
    const tasks = await loadTaskCollection();
    res.send(await tasks.find({}).toArray());
});


// Add task
router.post('/', async (req, res) => {
    const tasks = await loadTaskCollection();
    await tasks.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send()
});


// Delete task
router.delete('/:id', async (req, res) => {
    const tasks = await loadTaskCollection();
    await tasks.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadTaskCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://admin:a123456@ds052968.mlab.com:52968/taskapp', {
        useNewUrlParser: true
    });

    return client.db('taskapp').collection('tasks');
}

module.exports = router;
