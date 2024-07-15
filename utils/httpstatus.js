class httpstatus{
    successResponse(data,res) {
        return res.status(200).json({                        
            "code": 200,
            "status": "success",
            "data": data
        });
    }
    errorResponse(data,res) {
        return res.status(500).json({                        
            "code": 500,
            "status": "failure",
            "data": data
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
