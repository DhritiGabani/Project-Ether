let express = require("express");
let bodyparser = require("body-parser");
let app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(function (req, res, next) {
  console.log(`${new Date()} - ${req.method} request for ${req.url}`);
  next();
});

app.use(express.static("../static/"));

app.post("/HeartDisease-success", function (req, res) {
  var spawn = require("child_process").spawn;
  var process = spawn("python", [
    "./heart-disease.py",
    JSON.stringify(req.body),
  ]);

  process.stdout.on("data", function (data) {
    console.log("python script's output");
    let prediction =
      data.toString() == "0"
        ? "Healthy, Nearly No Chances Of Heart Disease"
        : "High Chances of Heart Disease Detected. Visit A Doctor Soon.";
    res.send(prediction);
  });
});

app.post("/resp-success", function (req, res) {
  var spawn = require("child_process").spawn;
  var process = spawn("python", [
    "./resp-disease.py",
    JSON.stringify(req.body),
  ]);

  process.stdout.on("data", function (data) {
    res.send(data);
    console.log(data.toString());
  });
});

app.listen(8888, function () {
  console.log("Serving static on 8888....");
});
