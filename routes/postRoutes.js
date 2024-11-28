const express= require("express")
const router= express.Router()
const upload = require("../middleware/multer");
const postController= require("../controllers/postController")
const {ensureAuth,ensureGuest}= require("../middleware/auth")
const commentController= require("../controllers/commentController")

router.get("/",ensureAuth,postController.getProfile)
router.get("/posts",ensureAuth, postController.getPost)
router.post("/posts",ensureAuth,postController.addPost)
router.delete("/posts/:id",ensureAuth,postController.deletePost)
router.get("/posts/:id",ensureAuth,postController.getSinglePost)
router.post("/comments/:id",ensureAuth, commentController.addComment)
router.put("/posts/:id",ensureAuth,postController.updateLikes)
router.post("/posts/images",upload.single("file"),postController.addImages)






module.exports=router