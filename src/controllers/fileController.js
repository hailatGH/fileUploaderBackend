const {
  models: { File },
} = require("../models");
const uploadFile = require("../middleware/upload");
const fs = require("fs");
const { error } = require("console");

const baseUrl = "http://localhost:3000/";

module.exports = {
  upload: async (req, res) => {
    try {
      await uploadFile(req, res);

      if (req.file == undefined) {
        return res.status(400).send({ error: "Please upload a file!" });
      }
      try {
        const fileName = req.file.originalname;
        const fileSize = req.file.size;
        const filePath = baseUrl + req.file.path;
        const file = await File.create({ fileName, fileSize, filePath });
        res.status(201).json(file);
      } catch (error) {
        res.status(500).json({ error: `Internal server error, ${error}` });
      }
    } catch (error) {
      res.status(500).send({
        error: `Could not upload the file, ${error}`,
      });
    }
  },

  list: async (req, res) => {
    try {
      const files = await File.findAll();

      if (!files) {
        return res.status(404).json({ error: "Files not found" });
      }

      res.json(files);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  get: async (req, res) => {
    try {
      const { id } = req.params;
      const file = await File.findByPk(id);

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      res.json(file);
    } catch (error) {
      res.status(500).json({ error: `Internal server error, ${error}` });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const file = await File.findByPk(id);

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      const filePath = `uploads/${file.dataValues.fileName}`;

      fs.unlink(filePath, async (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: `Failed to delete file ${error}` });
        } else {
          await file.destroy();
          res.json({ message: "File deleted successfully" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: `Internal server error, ${error}` });
    }
  },
};
