var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require("path");
const con = require("../config/dbConfig");


const storage = multer.diskStorage({
  destination: "./../client/public/uploads",
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
}).single("file");


//get all products
router.get('/getProducts', function (req, res, next) {
  var sql =
    "SELECT * FROM products";
  con.query(sql, function (error, result) {
    if (error) return res.status(500).send(error.sqlMessage);
    res.send({
      success: true,
      data: result,
    });
  });
});

//add product
router.post('/add', upload, function (req, res, next) {
  let savedPath;
  const file = req.file;
  if (!file) {
    savedPath = null;
  } else {
    savedPath = "/uploads/" + file.filename;
  }

  const datas = req.body;
  const product = {
    name: datas.name,
    mrp: datas.mrp,
    srp: datas.srp,
    image: savedPath,
  };

  var query = "INSERT INTO products SET ?";
  con.query(query, product, function (error, result) {
    if (error) return res.status(500).send({ error: error.message });
    if (result.affectedRows > 0) {
      return res.send(
        { message: "added successfully", success: true }
      );
    } else return res.status(500).send({ message: "error", success: false });
  });
});

//search product
router.post('/search', function (req, res) {
  const key = req.body.key;
  const splittedKeys = key.split(/\s+/);
  const newKey = "%" + splittedKeys.join("%") + "%";

  var query = "SELECT * FROM products WHERE name LIKE ?";
  con.query(query, newKey, function (error, result) {
    if (error) return res.status(500).send({ error: error.message });
    res.send({
      success: true,
      data: result,
    });
  });
});

module.exports = router;
