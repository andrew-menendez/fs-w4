

var findACount= function(string){

	var input=string

	var a_match= /a/gi

	var match;
	var count = 0
	while (match=a_match.exec(input))
		count+=1

	return count
};




var areaCodeFinder= function(number){

	var input=number

	var areaCode= /^\(?(\d{3})/g

	var match;
	var count = 0
	while (match=areaCode.exec(input))
		return parseInt(match[1]);

};


var adjustUrlParameter = function(url,param) {
    
    var url=url
    
    param_type=param.split('=')[0]
    param_num=param.split('=')[1]
    console.log(param_type,param_num)
    
    new_url=""
    
    endsInCom=/\.com$/
    
    endsInParam=/\=\d{3}$/
    
   sameParam= new RegExp(param_type+"\\=\\d{3}");
    
    url_strip=url.slice(0,-3)
    console.log(url_strip)
    console.log(endsInCom.test(url))
    console.log(endsInParam.test(url))
    console.log(sameParam.test(url))
    

    if (endsInCom.test(url)==true) {
  
        new_url=url+"?"+param
    }
    if (endsInParam.test(url)==true) {
        
        if(sameParam.test(url)==true){
            //replace numbers only
            new_url=url_strip+param_num
        }else if (sameParam.test(url)==false){
        //add with ampersand
        new_url=url+"&"+param
        };
    
    }
    return new_url
};


var stringPlusPlus = function(input) {
    
    var string=input
    
    new_string=""
    
    endsInNum=/\d$/
    
    endsInLetter=/\w$/
    
    nums=/(\d+)$/
    
    padZeros=/\D(0+)/
    
    //console.log(string.length)
    
    
    //console.log(endsInNum.test(string))
    


    if (endsInNum.test(string)==true) {
  
        //do something
            console.log("ends in number")
        
        var numCatch = nums.exec(string) // put match in numCatch
            console.log(numCatch);
        
        
            
        var Int = parseInt(numCatch[1])
        
        var new_int=Int+1
        
            console.log(new_int)
        
       
        var digitCount= numCatch[1].length // place to store digit count
    
            console.log(digitCount);
        
        if (padZeros.test(string)==true){
            
            var Zeros = padZeros.exec(string) // catch padded zeros
            console.log(Zeros[1]);
        
            var padNewInt= (Zeros + new_int).slice(-1*digitCount)
                console.log(padNewInt)
            
            var string_slice=string.slice(0,(string.length - digitCount)) // string without numbers
                console.log(string_slice)
            
            new_string=string_slice+padNewInt
        
            } else if (padZeros.test(string)==false) {
                // takes care of number inputs
                if(string.length==digitCount){
                    console.log("hello")
                    new_string+=new_int
                } else if (string.length!=digitCount){
                new_string=string_slice+new_int
                };
                
            };
            
        
        
        } else if (endsInNum.test(string)==false){
            new_string=string+1
        };
    
    return new_string
};

