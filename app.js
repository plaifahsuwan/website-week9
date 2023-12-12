const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "localhost";

const server = http.createServer((req, res) => {
  console.log("Server request");
  console.log(req.url, req.method);
  res.setHeader("Content-Type", "text/html");
  const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);
  let basePath = "";
  switch (req.url) {
    case "/":
      basePath = createPath("index");
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/contacts");
      res.end();
      break;
    case "/contacts":
      basePath = createPath("contacts");
      res.statusCode = 200;
      break;
    default:
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

const port = 5000;
//http://localhost:3000
server.listen(port, () => {
  console.log(`The HTTP Server is running at http://${host}:${port}`);
});