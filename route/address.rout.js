const addressRout = require ("../controller/address.controller");
const authenticateCheck = require ("../middleware/authentication");
const autherisationCheck = require ("../middleware/autherisation");
module.exports=function (app){
    app.post("/addresses",addressRout.addAddress,authenticateCheck.verifyToken,autherisationCheck.checkUser);
}