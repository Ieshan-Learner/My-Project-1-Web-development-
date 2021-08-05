const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.email;

const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/c10c2b6c75"

const options ={
  method: "POST",
  auth: "ieshan12:7c934c619ff69ebc5dd711a866fdfca2-us6"
}

const request = https.request(url,options,function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}
else{
  res.sendFile(__dirname + "/failure.html");
}


  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();


});

app.post("/Failure",function (req,resp) {
  resp.redirect("/");
})

};

app.listen(process.env.PORT || 3000){
  console.log("Server is running on port 3000");
});



//api=7c934c619ff69ebc5dd711a866fdfca2-us6
//listid=c10c2b6c75
