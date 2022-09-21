console.log("Up and Ready");

const { exec } = require("child_process");

const express = require("express");

const fs = require("fs");

const app = express();

const https = require("https");

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

app.get("/test", async (req, res) => {
  exec(`dir ./`, (error, stdout, stderr) => {
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
  res.send(`HELLO!`);
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
