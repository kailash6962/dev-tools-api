class httpstatus{
    successResponse(data,res) {
        return res.status(200).json({                        
            "code": 200,
            "status": "success",
            "data": data
        });
    }
    errorResponse(e,res) {
        let errorObj={}; 
        errorObj.code = e.code;
        errorObj.message = process.env.ENVIRONMENT=='production'?"Something went Wrong!! Please Contact administrator for mode details":e.message;
        return res.status(500).json({error:{errors:errorObj}});
    }
    invalidInputResponse(data,res) {
        return res.status(400).json({error: data});
    }
}
module.exports = new httpstatus();
