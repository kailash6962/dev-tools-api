class httpstatus{
    successResponse(data,res) {
        return res.status(200).json({                        
            "code": 200,
            "status": "success",
            "data": data
        });
    }
    errorResponse(e,res) {
        return res.status(500).json({                        
            "code": 500,
            "status": "failure",
            "data": process.env.ENVIRONMENT=='production'?"Something went Wrong!! Please Contact administrator for mode details.":e.message
        });
    }
    invalidInputResponse(data,res) {
        return res.status(422).json({
          code: 422,
          status: "error",
          data: data,
        });
    }
}
module.exports = new httpstatus();
