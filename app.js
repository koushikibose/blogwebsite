

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to our blog website! Here, we are committed to providing you with informative and engaging content that covers a wide range of topics. Whether you're looking for advice on personal finance, tips for healthy living, or insights into the latest industry trends, you'll find it all here on our blog. Our homepage is designed to give you a taste of what you can expect from our website. Here, you'll find featured articles, popular categories, and easy-to-use navigation that makes it simple to find the content that interests you most. But we don't just stop at the homepage - every page on our website is crafted with care to ensure that you have the best possible experience. ";
const aboutContent = " At our core, we are a team of passionate writers and experts who are committed to delivering high-quality content that informs, educates, and entertains. Our mission is to provide readers with valuable insights and information that they can use to improve their lives and achieve their goals. We believe that everyone deserves access to accurate and reliable information, and we strive to be a trusted source of knowledge on a wide range of topics. We understand that building trust with our readers is essential, which is why we take our responsibility to deliver accurate and well-researched content seriously. We are committed to upholding the highest standards of journalistic integrity and ethics in everything we do. Our team is made up of experts and professionals from a variety of fields, all of whom are dedicated to sharing their knowledge and experience with our readers. We are passionate about what we do, and we believe that our enthusiasm and commitment shine through in every piece of content we produce. We are constantly striving to improve our website and the content we produce, and we welcome feedback from our readers. If you have any questions or comments, please don't hesitate to get in touch with us. We value your input and are always looking for ways to improve our website and better serve our readers. Thank you for taking the time to learn more about us. We hope that you find our website to be a valuable resource and that you visit us often for the latest insights and information.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){

  res.render("home",{home:homeStartingContent,
  posts:posts});
  
 
});
app.get("/about",function(req,res){

  res.render("about",{about:aboutContent});
 
});
app.get("/contact",function(req,res){

  res.render("contact",{contact:contactContent});
 
});
app.get("/compose",function(req,res){

  res.render("compose");
 
});
app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postText
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName",function(req,res){
  var par=_.lowerCase(req.params.postName);
  posts.forEach(function(post){
    var titlename=_.lowerCase(post.title);
    
    if(par===titlename){
      res.render("post",{
        title:post.title,
        content:post.content
      });
    }
  });
    
  
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
