const express = require('express')

const router = express.Router()
const userController = require('../controllers/products')


router.get('/products',userController.getProduct )

router.post('/post-product',userController.postProduct)

router.get('/productDetail/:productId', userController.productDetail)

router.get('/products/:productId', userController.productPrep)

router.put('/products/edit/:prodId?', userController.postEditProduct)

router.delete('/delete-product/:prodId', userController.deleteProduct)


module.exports = router
