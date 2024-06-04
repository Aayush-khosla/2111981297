const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

router.get('/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const n = parseInt(req.query.n) || 10;
    const page = parseInt(req.query.page) || 1;
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
    const sortBy = req.query.sortBy;
    const order = req.query.order === 'desc' ? 'desc' : 'asc';

    try {
        const products = await productService.getTopProducts(categoryname, n, page, minPrice, maxPrice, sortBy, order);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        const product = await productService.getProductById(categoryname, productid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
