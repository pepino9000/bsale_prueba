const http = require("http");
const fs = require("fs");
const {
  getData,
  getDataLike,
  getCategories,
  getCategoriesById,
} = require("./consultas");
const PORT = process.env.PORT || 5000;

http
  .createServer(async function (req, res) {
    if (req.url == "/" && req.method == "GET") {
      try {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile("index.html", "utf8", (err, html) => {
          res.end(html);
        });
      } catch (error) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    }
    if (req.url.startsWith("/products") && req.method == "GET") {
      try {
        let data = await getData();
        data.forEach((element) => {
          if (element.discount !== 0) {
            element.price = Math.round(
              element.price - (element.price * element.discount) / 100
            );
          }
          if (element.url_image == null || element.url_image == "") {
            element.url_image =
              "https://www.wilddesignz.com/image/cache/catalog/placeholderproduct-max-228.png";
          }
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } catch (error) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    }
    if (req.url.startsWith("/products") && req.method == "POST") {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          const id = body;
          let data = await getDataLike(id);
          data.forEach((element) => {
            if (element.discount !== 0) {
              element.price = Math.round(
                element.price - (element.price * element.discount) / 100
              );
            }
            if (element.url_image == null || element.url_image == "") {
              element.url_image =
                "https://www.wilddesignz.com/image/cache/catalog/placeholderproduct-max-228.png";
            }
          });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(data));
        });
      } catch (error) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    }
    if (req.url.startsWith("/CSS") && req.method == "GET") {
      try {
        res.writeHead(200, { "Content-Type": "text/css" });
        fs.readFile("index.css", "utf8", (err, css) => {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(css);
        });
      } catch (error) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    }
    if (req.url.startsWith("/categories") && req.method == "GET") {
      try {
        let data = await getCategories();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } catch (error) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    }
    if (req.url.startsWith("/categories") && req.method == "POST") {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          const datos = body;
          let data = await getCategoriesById(datos);
          data.forEach((element) => {
            if (element.discount !== 0) {
              element.price = Math.round(
                element.price - (element.price * element.discount) / 100
              );
            }
            if (element.url_image == null || element.url_image == "") {
              element.url_image =
                "https://www.wilddesignz.com/image/cache/catalog/placeholderproduct-max-228.png";
            }
          });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(data));
        });
      } catch (error) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    }
  })
  .listen(PORT);
