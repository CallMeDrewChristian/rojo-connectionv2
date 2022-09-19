console.log("Up and Ready");

const { exec } = require("child_process");

const express = require("express");

const fs = require("fs");

const app = express();

const rojo_url =
  "https://github.com/CallMeDrewChristian/rojo-data/raw/main/rojo.exe";

const http_options = {
  method: "GET",
  url: `${rojo_url}`,
};

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.send("it works");
});

app.get("/test", async (request, response) => {
  request(http_options, function (error, response, body) {
    if (error) throw new Error(error);
    const fileStream = fs.createWriteStream("rojo.exe");
    fileStream.on("error", function (err) {
      console.log("Error writing to the stream");
      console.log(err);
    });
    fileStream.on("finish", function () {
      exec("dir", (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    });
    response.send("HELLO!");
  });
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
