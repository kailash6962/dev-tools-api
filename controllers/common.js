const httpstatus = require("../utils/httpstatus"),
db = require("../config/mysql").knex,
{updateFields,insertFields} = require("../utils/common"),
validator = require("../utils/validator");


class Common {
    async dashboard(req,res){
    try{    
        // let rules = {  
        //     project_name: 'required|string',
        //     stack: 'required|string',
        //     description: 'required|string'
        // }
        // if(validator.validate(req,res,rules))
        // return;
        
        // code block {

        const [projectCount, mockServerCount, mockServerReqCount] = await Promise.all([
            db('projects').count('* as count').where('created_by', req.user.id).first(),
            db('MockServer').count('* as count').where('created_by', req.user.id).first(),
            db('MockServerRequest').count('* as count').where('created_by', req.user.id).first(),
        ]);

        const requestLogs = await db('RequestLogs as rl')
                            .leftJoin('MockServerRequest as msr','msr.id','rl.mock_request_id')
                            .leftJoin('MockServer as ms','msr.mock_server_id','ms.id')
                            .leftJoin('projects as p','ms.project_id','p.id')
                            .select(
                                'rl.id',
                                'p.project_name',
                                'ms.name as server_name',
                                'msr.name as request_name','msr.url_slug',
                                'rl.request_count',
                            )
                            .where({'ms.created_by':req.user.id})
        
        return httpstatus.successResponse({projectCount:projectCount.count, mockServerCount:mockServerCount.count, mockServerReqCount:mockServerReqCount.count ,requestLogs},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
}


module.exports = {
    Common,
}