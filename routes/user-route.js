const express = require('express')

const router = express.Router()
const userController = require('../controllers/products')
const isAuth=require('../middleware/is-auth')


router.get('/products',isAuth, userController.getProduct )

router.post('/post-product',isAuth, userController.postProduct)

router.get('/productDetail/:productId', userController.productDetail)

router.get('/products/:productId', userController.productPrep)

router.put('/products/edit/:prodId?', userController.postEditProduct)

router.delete('/delete-product/:prodId', userController.deleteProduct)


module.exports = router
