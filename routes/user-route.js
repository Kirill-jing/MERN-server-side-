const express = require('express')

const router = express.Router()
const userController = require('../controllers/products')


router.get('/products',userController.getProduct )

router.post('/post-product',userController.postProduct)

router.get('/products/:productId', userController.productDetail)

module.exports = router