var express = require('express');
var router = express.Router();
const con = require("../config/dbConfig");

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
router.post('/add', function (req, res, next) {

  const datas = req.body;
  const product = {
    name: datas.name,
    mrp: datas.mrp,
    srp: datas.srp,
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
