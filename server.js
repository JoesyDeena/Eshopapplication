const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const url = require("url");
const queryString = require("querystring");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const emailValidator = require("deep-email-validator");
const bcrpt = require("bcrypt");
const serverConfig = require('./config/config.server');
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Eshopapplication")
    .then(() => {
        console.log("Successfully connecting Eshop DB");
    })
    .catch((err) => {
        console.log("Error connecting Eshop DB", err);
        process.exit();
    })
require('./route/auth.rout')(app);
require('./route/address.rout')(app);
require('./route/product.rout')(app);
require('./route/order.rout')(app);
app.listen(serverConfig.PORT, () => {
    console.log(`server is running on PORT ${serverConfig.PORT}`);
});