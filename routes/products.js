var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");
/*
APP routes
*/
router.get('/', productController.listProducts);
router.get('/coffee', productController.listCoffeeProducts);
router.get('/pastries', productController.listPastryProducts);
router.get('/add', productController.displayInsertSingleProduct)
router.post('/add', productController.insertSingleProduct);
router.get('/:id', productController.displaySingleProduct);
router.patch('/update/:id', productController.updateSingleProduct);
router.delete('/delete/:id', productController.deleteSingleProduct);


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('products', { title: "Le Halle de Gourmets | Products" });
// });

module.exports = router;
