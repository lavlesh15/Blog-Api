const express = require("express");
const {createBlogController, deleteBlogController, UpdateBlogController, getAllBlogsController, getBlogController, addLikeController, clapBlogController } = require("../controllers/blogsControllers");
const router = express.Router()

router.get('/' , getAllBlogsController);
router.get('/:id', getBlogController);
router.post('/', createBlogController);
router.delete('/:id', deleteBlogController);
router.patch('/:id', UpdateBlogController);
router.post('/clap/:id' , clapBlogController);

// Like Feature.
router.post('/:id', addLikeController);
 
module.exports = router;