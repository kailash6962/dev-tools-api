const httpstatus = require("../utils/httpstatus");
const validator = require("../utils/validator");


class Sample {
    samplePOST(req,res){
    try{    
        let rules = {  
            name: 'required|string',
            age: 'required|integer'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {

        return httpstatus.successResponse(req.body,res);

        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse('Internal Server Error', res)}
    }
}

// add another class and methods {}

module.exports = {
    Sample,
    // add another class 
}