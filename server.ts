import * as express from "express";
import {promises as fsp} from "fs";
import * as os from "os";
import * as path from "path";
import {exec} from "child_process";
import * as livereload from "livereload";
import * as compression from "compression";

const app = express();
const port = process.env.PORT || 8000;

// standard stuff
app.use(compression());

app.use("/", async (req, res, next) => {
  if (req.path !== "/") {
    return next();
    // insert livereload
  }
  let file = await fsp.readFile("./index.html", "utf8");
  const lrBlurb = 
    "<script>document.write(`<script src=\"" +
    "${location.protocol}//${location.hostname}:35729/livereload.js\">" +
    "<` + `/script>`);</script>";
  file = file.replace("</body>", lrBlurb + "</body>");
  res.send(file);
});

app.use("/", express.static("."));
app.listen(port);

const livereload = require("livereload");

// server
const lrHttpServer = livereload.createServer({
  exts: ["html", "css", "png", "gif", "jpg", "svg"]
});
lrHttpServer.watch(__dirname);

exec(`xdg-open http://localhost:${port}`);