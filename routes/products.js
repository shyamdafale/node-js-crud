const express = require("express");
const router = express.Router();
const Product = require("../model/product");


router.get('/', async (req, res) => {

    console.log("Product Get Request is Called");

    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error is " + error);
    }
});

router.get('/:id', async (req, res) => {

    console.log("Products Get Request is Called for ID =" + req.params.id);

    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.error("Error is " + error);
        res.send("Error is " + error)
    }
});

router.post('/', async (req, res) => {

    const product = new Product({
        productId: req.body.productId,
        productName: req.body.productName
    });

    try {
        const a1 = await product.save();
        res.json(a1);
    } catch (error) {
        console.error("Error is " + error);
        res.send("<h1>Error while fetching saved Product</h1><p>" + error + "</p>");
    }

});



router.patch('/:id', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        product.productName = req.body.productName;
        const u1 = await product.save();
        res.json(u1);
    } catch (error) {
        console.error("Error is " + error);
        res.send("<h1>Error while fetching the Products</h1><p>" + error + "</p>");
    }

});


module.exports = router;