var express = require("express");
var fs = require("fs");
var formidable = require("express-formidable");

var app = express();

app.use(express.static("public"));
app.use(formidable());

app.get('/get-posts', function(request, response){
    fs.readFile(__dirname+'/data/posts.json', function(error, data){
        if(error){
            console.log('Error reading posts.json: ' + error);
            response.status(500);
            response.send(error);
        }else{
            response.send(data.toString());
        }
    });
    
});

app.post('/create-post', function(request, response){
    
    var now = Date.now();
    
    var newPost = {
        timestamp: now,
        content: request.fields.blogpost
    }
    
    fs.readFile(__dirname+'/data/posts.json', function(error, data){
        if(error){
            console.log('Error reading posts.json: ' + error);
            response.status(500);
            response.send(error);
        }else{
            var posts = JSON.parse(data);
            console.log("posts: " + JSON.stringify(posts));
            console.log("postblogsposts: " + JSON.stringify(posts.blogposts));
            console.log("postblogsposts[0]" + posts.blogposts[0].content);
            console.log("posts length" + posts.blogposts.length);
            response.send(newPost);
        }
    });

});

app.listen(8080, function(){
    console.log("Server has started listening on port 8080.");
})