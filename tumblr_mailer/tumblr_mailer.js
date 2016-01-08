
//Packages
var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');

// <----------- Tumblr Oauth ------------->
// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'zoUpQUpd7rngipo6YLAwLYtKNLIGow1T3kNU4LgZ2skRImPbSs',
  consumer_secret: 'a2xJA9VKDpvQno3ile9avJvg00ReMi0zkVTukWZXV2pyYe1OJq',
  token: 'UZsl3Bwbh8ULq7SK5JaOsmhhsl3SNNjoCcKVl5daDo2VsJGGdw',
  token_secret: 'bB1QSJV4Vlx1R3GaRDDj1xiwiIc2QjYmeMnSOPEYmBhZxxlUAq'
});
// <----------- Tumblr Oauth ------------->

var csvFile = fs.readFileSync("friend_list.csv","utf8");
//console.log(csvFile);

var csvParse = function (dataObject) {

	//console.log(typeof dataObject)

	csvArray=dataObject.split("\n");
	objArray=[];

	headers=csvArray[0].split(",");

	//console.log(headers)
	// note for later: make an object for each row in csvArray using "headers" as keys

	for (var i = 1; i < csvArray.length; i++) {
	 	
	 	var row_obj={}
	
		var row=csvArray[i].split(",");

		for(var j=0; j<row.length;j++){

			//console.log(row[cell])

			row_obj[headers[j]]=row[j];

		};

		objArray.push(row_obj)

	};

	//console.log(objArray);

	return objArray;

};

var contactData=csvParse(csvFile);

console.log(csvParse(csvFile));

console.log(contactData[1].lastName)

/// the email template

var template1 = fs.readFileSync("./email_template.html","utf8");


//Create a function that iterates over the return value from your csvParse function.
// Replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT fields in your email_template.html
// file with their actual values for each contact.

var mailMerge= function(data,template){
	email_array=[];

	for(var contact in data){

		//console.log(data[contact].firstName)
		var temp=template.replace("FIRST_NAME", data[contact].firstName);

		temp=temp.replace("NUM_MONTHS_SINCE_CONTACT",data[contact].numMonthsSinceContact)

		//console.log(temp)

		email_array.push(temp)

	};

	return email_array

};

//emailz=mailMerge(contactData,template1);


//console.log(emailz);

/// <--------------------EJS SECTION --------------------->///
//// Using EJS 

var template2 = fs.readFileSync("./email_template.ejs","utf8");


var ejsMailMerge= function(template,data,latestPosts){ // added the lastestPosts from the client.posts function

	email_array=[]

	for(var contact in data){

		ejsDatum={
			firstName:data[contact].firstName,
			numMonthsSinceContact:data[contact].numMonthsSinceContact,
			latestPosts:latestPosts //
				};

		//console.log(ejsDatum);

		var customizedTemplate = ejs.render(template,ejsDatum);

		console.log(customizedTemplate);

	};

	
	email_array.push(customizedTemplate);

	return email_array;

};

//emaily=ejsMailMerge(template2,contactData);


//client.posts('menendez-code', function(err, blog){
//  console.log(blog);
//});


// <-----------ingesting tumblr data -------------->



client.posts('menendez-code', function(err, blog){
  //console.log(blog.posts);
  
  var latestPosts=[];

  // date stuffs
  var d= new Date()
  var lastWeek=new Date();
  day=d.getDate();

  lastWeek.setDate((day-7));

  lwTime=Math.floor(lastWeek.getTime()/1000) // should be last week in unixtime
  console.log(lwTime);
  //

  for(var post in blog.posts){
  	//keyData.push([blog.posts[post.post_url],blog.posts[post.date])

  	var recentPost={};
  	console.log(blog.posts[post].summary)
  	
  	console.log(blog.posts[post].timestamp)
  	

  	if (blog.posts[post].timestamp >lwTime) {
  		recentPost.href=blog.posts[post].post_url
  		recentPost.title=blog.posts[post].title
  		console.log("this post is recent")
  		latestPosts.push(recentPost);
  	} else if (blog.posts[post].timestamp <lwTime){
  		
  		console.log("this post is old")
  	};
  	
  	

  };

console.log(latestPosts);

emailX=ejsMailMerge(template2,contactData,latestPosts);

console.log("--------------------------------------------")
//console.log(emailX);
  	
});
/////////////// This works but I have some general questions - 
///why can't I access this data outside of the client.post function environment? 








