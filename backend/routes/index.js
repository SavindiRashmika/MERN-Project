const express = require('express')
const router = express.Router()

const userSignUpController = require("../controller/userSignUp")
const userSignInController = require("../controller/userSignIn")
const authToken = require('../middleware/authToken')
const userDetailsController = require("../controller/userDetails")
const userLogout = require("../controller/userLogout")
const allUsers = require("../controller/allUsers")
const updateUser = require('../controller/updateUser')
const getProductController = require('../controller/getProduct')
const UploadProductController = require('../controller/uploadProduct')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout",userLogout)


router.get("/all-users", authToken, allUsers)
router.post("/update-users", authToken, updateUser)

router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)


module.exports = router