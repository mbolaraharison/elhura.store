module.exports = (app,authenticateToken) => {
    const articleController = require("../controllers/article.controller.js");
    const favoritesController = require("../controllers/favorites.controller.js");
    const articleTagsController = require("../controllers/article-tags.controller.js");

    var router = require("express").Router();

    //Retrieve all Articles
    router.get("/", authenticateToken, articleController.findAll);
    // Read a single Article
    router.get("/:idArticle", authenticateToken, articleController.findOne);
    //Create a article
    router.post("/", authenticateToken, articleController.create);
    // Update an article
    router.put("/:idArticle", authenticateToken, articleController.update);
    // Delete a article by id
    router.delete("/:idArticle", authenticateToken, articleController.deleteOne);
    // Delete all articles
    router.delete("/", authenticateToken, articleController.deleteAll);

    //Create a articleTag
<<<<<<< HEAD
    router.post("/:id/tags", authenticateToken,articleTagsController.create);
=======
    router.post("/:id/tags", authenticateToken, articleTagsController.create);
>>>>>>> 5826316d83ff39062b79eea4ccbaf53e99f4fadf
    //Retrieve all articleTags by tag id
    router.get("/:id/tags", authenticateToken, articleTagsController.findByArticle);
    // Retrieve a single articleTag with idArticle and idTag
    router.get("/:idArticle/tags/:idTag", authenticateToken, articleTagsController.findOne);
    // Delete a articleTag by tag
<<<<<<< HEAD
    router.delete("/:id/tags", authenticateToken,articleTagsController.deleteByArticle);
    // Delete a articleTag by idArticle and idTag
    router.delete("/:idArticle/tags/:idTag",authenticateToken, articleTagsController.deleteOne);
=======
    router.delete("/:id/tags", authenticateToken, articleTagsController.deleteByArticle);
    // Delete a articleTag by idArticle and idTag
    router.delete("/:idArticle/tags/:idTag", authenticateToken, articleTagsController.deleteOne);
>>>>>>> 5826316d83ff39062b79eea4ccbaf53e99f4fadf

    app.use('/api/articles', router);
  };