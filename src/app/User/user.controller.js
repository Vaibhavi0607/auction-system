const User = require('../../models/User');

const addMoney = async (req, res) => {
  const moneyAmount = req.body.amount;
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (user) {
    user.amount += moneyAmount;
    const updatedMoney = await user.save();
    res.status(200).json(updatedMoney);
  } else {
    throw new Error('User not found');
  }
};

const addUser = async (req, res) => {
  try {
    const data = new User({
      name: req.body.name,
      address: req.body.address,
      accountId: req.body.accountId,
      amount: req.body.amount,
      email: req.body.email,
      password: req.body.password
    });
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = { addMoney, addUser };
