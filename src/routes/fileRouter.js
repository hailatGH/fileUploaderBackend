const express = require("express");
const { fileController } = require("../controllers");

const router = express.Router();

const routes = (app) => {
  router.get("/file/:id", fileController.get);
  router.get("/file", fileController.list);
  router.post("/file", fileController.upload);
  router.delete("/file/:id", fileController.destroy);

  app.use(router);
};

module.exports = routes;
