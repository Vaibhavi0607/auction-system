const express = require('express');
const router = express.Router();
const User = require('../../models/User');
//63498895d7c462f84064a63f
//GET ALL USERS
router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json(err.message)
    }
});

//REGISTER A USER
router.post('/', (req, res) => {
    console.log(req.body)
    console.log('Hello from post')
    const data = new User({
        name: req.body.name,
        address: req.body.address,
        accountId: req.body.accountId,
        amount: req.body.amount,
        email: req.body.email
    });

    data.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err})
    });
});

//ADD MORE MONEY
router.post('/addMoney/:userId', async (req, res) => {
    const moneyAmount = req.body.amount;
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (user) {
        user.amount += moneyAmount;
        user.save()
        .then((updatedMoney) => {
            res.json(updatedMoney);
        })
        .catch(err => {
            res.json(err.message);
        })
    } else {
        res.json({message: 'User not found'})
    }

});

//DELETE USER
router.delete('/remove/:userId', async (req, res) => {
    try{
        const deleteUser = await User.deleteOne({_id: req.params.userId});
        res.json(deleteUser);
    } catch(err) {
        res.json(err.message);
    }
});

module.exports = router;
