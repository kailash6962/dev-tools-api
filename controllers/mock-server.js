const httpstatus = require("../utils/httpstatus"),
db = require("../config/mysql").knex,
{updateFields,insertFields,extractExistingColumns} = require("../utils/common"),
validator = require("../utils/validator");


class MockServer {
    async create(req,res){
    try{    
        let rules = {  
            project_id: 'required|integer',
            name: 'required|string',
            description: 'string'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let insert = await db('MockServer').insert({
            ...req.body,
            ...insertFields(req.user)
        });
        return httpstatus.successResponse({message:insert?"Data Inserted Successfully":"Failed to Insert"},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async read(req,res){
    try{    
        let rules = {  
            id: 'integer',
            project_id: 'integer',
            name: 'string',
            description: 'string'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let reqdata = await extractExistingColumns('MockServer',req.body,'ms');
        let read = await db('MockServer as ms').where(reqdata).where({'ms.created_by':req.user.id})
        .select('ms.*','p.project_name')
        .leftJoin('projects as p','p.id','ms.project_id');
        return httpstatus.successResponse({count:read.length,data:read},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async update(req,res){
    try{    
        let rules = {  
            id: 'required|integer',
            project_id: 'integer',
            name: 'string',
            description: 'string'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let data = await extractExistingColumns('MockServer',req.body);
        console.log("📢[:64]: data: ", data);
        let update = await db('MockServer').where({id:data.id}).update({...data,...updateFields(req.user)});
        return httpstatus.successResponse({message:update?"Data Updated Successfully":"Failed to Update"},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async delete(req,res){
    try{    
        let rules = {  
            id: 'required|integer',
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let deletedata = await db('MockServer').where({id:req.body.id}).delete();
        return httpstatus.successResponse({message:deletedata?"Data Deleted Successfully":"Failed to Delete"},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
}


module.exports = {
    MockServer,
}