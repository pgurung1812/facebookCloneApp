const express= require("express")
const router= express.Router()
const homeController= require("../controllers/homeController")
const authController= require("../controllers/authController")

router.get("/",homeController.getIndex)
router.get("/login",authController.getLogin)
router.post("/login",authController.postLogin)
router.get("/signup",authController.getSignup)
router.post("/signup",authController.postSignup)
router.get("/logout", authController.logout)





module.exports=router