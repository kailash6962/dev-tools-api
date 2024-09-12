const httpstatus = require("../utils/httpstatus"),
db = require("../config/mysql").knex,
validator = require("../utils/validator");


class MockServer {
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


module.exports = {
    MockServer,
}