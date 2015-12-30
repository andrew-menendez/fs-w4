
var Profile = require("./profile.js");
var Renderer = require("./renderer.js")

var querystring= require("querystring");

var commonHeaders = { 'Content-Type': 'text/html' }



function home(request,response){
		var now = new Date();//timestamp on refresh

	if (request.url==='/'){ // the home page
		if(request.method.toLowerCase()==="get"){
			response.writeHead(200, commonHeaders);
			Renderer.view("header",{},response);
			Renderer.view("search",{},response);
			Renderer.view("footer",{},response);
			response.end();
		}else {

			request.on("data",function(postBody){

				console.log(postBody.toString());
				//get post data from body
				var query=querystring.parse(postBody.toString())
				
				// extract the username
				response.writeHead(303, {"location":"/"+ query.username})
				
				// redirect to correct page
				response.end();	

			})

		};
	  
	  };
  };


  function user(request,response){
		var now = new Date();
	var username= request.url.replace("/","");

	if(username.length >0) {

		response.writeHead(200, commonHeaders);
	  	Renderer.view("header",{},response);
	  
	  	//get json from treehouse
	  	var studentProfile = new Profile(username);
	  	//on end
	  	studentProfile.on("end", function(profileJSON){
	  		//show profile
	  		//store values
	  		
	  		var values = {
	  			avatarUrl:profileJSON.gravatar_url,
	  			username: profileJSON.profile_name,
	  			badgecount:profileJSON.badges.length,
	  			javascriptPoints:profileJSON.points.JavaScript
	  		};

	  		Renderer.view("profile",values,response);
	  		Renderer.view("footer",{},response);
	  		response.end();
	  	});

	  	studentProfile.on("error", function(error){
	  		//show error
	  		Renderer.view("error",{errorMessage: error.message},response);
	  		Renderer.view("search",{},response);
	  		Renderer.view("footer",{},response);
	  		response.end();
	  	});

	}

};






module.exports.home = home
module.exports.user = user