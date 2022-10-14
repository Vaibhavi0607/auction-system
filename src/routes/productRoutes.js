const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

//GET PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json(err.message);
    }
});

//CREATE PRODUCT
router.post('/', async (req, res) => {
    const products = new Product({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        minBidAmount: req.body.minBidAmount,
        biddingWindow: req.body.biddingWindow,
        biddingStatus: req.body.biddingStatus,
        owner: req.body.owner,
        bids: req.body.bids
    });
    await products.save()
    .catch(err => {
        res.status(400).json(err.message);
    })

    res.status(200).json(products);
});

//DELETE PRODUCT
router.delete('/remove/:productId', async (req, res) => {
    try{
        const deleteProduct = await Product.deleteOne({_id: req.params.productId});
        res.json(deleteProduct);
    } catch(err) {
        res.json(err.message);
    }
});

//BIDDERS ON PRODUCT
router.get('/', async (req, res) => {

})

module.exports = router;