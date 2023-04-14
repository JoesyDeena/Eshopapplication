const userRout = require ('../controller/auth.controller');
const addressRout = require('../controller/address.controller');

module.exports = function(app){
  app.post("/users",userRout.addNew); 
  app.post("/auth",userRout.signIn); 
  
}