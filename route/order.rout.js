const orderDetails = require ("../controller/order.controller");
const authenticateCheck = require ("../middleware/authentication");
const autherisationCheck = require ("../middleware/autherisation");
module.exports = function(app){
    app.post('/orders',autherisationCheck.checkUser,orderDetails.createOrder);
}