const express = require("express");
const {trace, context} = require('@opentelemetry/api');


var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const PORT = process.env.PORT || "8080";
const app = express();

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})


app.get("/", (req, res) => {
  const span = trace.getSpan(context.active());
  console.dir(span);
  res.send("Hello World!");
});


app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
