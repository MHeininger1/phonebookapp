const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost/phonebook", { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

const contact = mongoose.model("contact", contactSchema);

  app.get("/", function(req, res){
    contact.find({}, function(err, allContacts){
        if (err){
            console.log(err);
        } else {
            res.render("landing", {contacts: allContacts});
        }
    });
    
  });

  app.post("/", function(req, res){
      let name = req.body.name;
      let phone = req.body.phone;
      let email = req.body.email;
      let newContact = {name: name, phone: phone, email: email}
      contact.create(newContact, function(err, addedContact){
          if(err){
              console.log(err);
          }else{
              res.redirect("/");  
          }
      });
  });

  app.post("/delete", function(req, res){
    let id = req.body.id;
    contact.findByIdAndRemove(id, function(){
        res.redirect("/");
    });
  });
  

  app.listen(3000, function(){
    console.log("server running");
});