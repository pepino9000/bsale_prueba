var mysql = require("mysql");
var connection = mysql.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

//consulta todos los productos en la base de datos, ordenándolos por categoría
const getData = () =>
  new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) console.error(err);
      connection.query(
        "SELECT * FROM product ORDER BY category",
        (err, results) => {
          if (err) console.error(err);
          resolve(results);
          connection.release((err) => {
            if (err) console.error(err);
          });
        }
      );
    });
  });
//filtra los productos que contengan en su nombre la palabra escogida
const getDataLike = (name) =>
  new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) console.error(err);
      connection.query(
        `SELECT * FROM  product WHERE name LIKE '%${name}%'`,
        (err, results) => {
          if (err) console.error(err);
          resolve(results);
          connection.release((err) => {
            if (err) console.error(err);
          });
        }
      );
    });
  });
//obtiene los datos de las categorías (nombre e id)
const getCategories = () =>
  new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) console.error(err);
      connection.query(`SELECT * FROM category `, (err, results) => {
        if (err) console.error(err);
        resolve(results);
        connection.release((err) => {
          if (err) console.error(err);
        });
      });
    });
  });
//Filtra los productos según una categoría (se conecta con los botones de categoría del frontend)
const getCategoriesById = (id) =>
  new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) console.error(err);
      connection.query(
        `SELECT * FROM product WHERE category=${id}`,
        (err, results) => {
          if (err) console.error(err);
          resolve(results);
          connection.release((err) => {
            if (err) console.error(err);
          });
        }
      );
    });
  });
module.exports = { getData, getDataLike, getCategories, getCategoriesById };
