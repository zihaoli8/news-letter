const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//use the express package
const app = express();
// use the static css and image
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstname = req.body.fName
  const lastname = req.body.lName
  const email = req.body.email
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  // #{key audience key}
  const url = "https://us14.api.mailchimp.com/3.0/lists/{key}";
  const options = {
    method : "POST",
    //api key type your key
    auth: "Grant:{api key}"
  }
  const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
          res.sendFile(__dirname + "/sucess.html");
        } else {
          res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
          console.log(JSON.parse(data));
        })
      })
      request.write(jsonData);
      request.end();
    });
app.post("/failure", function(req,res){
  console.log("222222222");
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000")
})
