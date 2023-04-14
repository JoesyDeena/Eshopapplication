const productDetails =require ("../controller/product.controller");
const authenticateCheck = require ("../middleware/authentication");
const autherisationCheck = require ("../middleware/autherisation");
module.exports = function(app){
   app.post('/products',authenticateCheck.verifyToken,autherisationCheck.checkAdmin,productDetails.saveProduct);
   app.get('/products',productDetails.searchProduct); 
   app.get('/products/categories',productDetails.productCategory);
   app.get('/products/id',productDetails.getByid);
   app.put('/products/id',authenticateCheck.checkAdmin,productDetails.updateDetails);
   app.delete('/products/id',authenticateCheck.checkAdmin,productDetails.DeleteProducts);
}