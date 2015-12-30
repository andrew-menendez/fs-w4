
var fs=require("fs");


function mergeValues(values,content){

	// Cycle over Keys
		//replace all {{key}} with the value of the object
	for(var key in values){
		content=content.replace("{{"+ key+ "}}",values[key]);
	}
	//return merged content
	return content;
};

function view(templateName,values,response){
	//read from template files
	var fileContents=fs.readFileSync('./views/'+templateName+'.html',{encoding:"utf8"})

		//insert content values

	fileContents=mergeValues(values,fileContents);

	  response.write(fileContents);
	
	

	//write out to response
};

module.exports.view = view;