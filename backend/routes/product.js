const express = require('express');
const router = express.Router();


const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')

const { isAutheticadedUser, authorizeRoles } = require('../middleware/auth')


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAutheticadedUser, authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id')
    .put(isAutheticadedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAutheticadedUser, authorizeRoles('admin'), deleteProduct);



module.exports = router;