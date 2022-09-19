console.log("Up and Ready");

const {exec} = require("child_process");

const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", async (request, response) => {
  response.send("Test");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
