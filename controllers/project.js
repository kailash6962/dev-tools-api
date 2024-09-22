const httpstatus = require("../utils/httpstatus"),
db = require("../config/mysql").knex,
{updateFields,insertFields} = require("../utils/common"),
validator = require("../utils/validator");


class Project {
    async create(req,res){
    try{    
        let rules = {  
            project_name: 'required|string',
            stack: 'required|string',
            description: 'required|string'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let insert = await db('projects').insert({
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
            project_name: 'string',
            stack: 'string',
            description: 'string'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let read = await db('projects').where(req.body).where({created_by:req.user.id});
        return httpstatus.successResponse({count:read.length,data:read},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async update(req,res){
    try{    
        let rules = {  
            id: 'required|integer',
            project_name: 'string',
            stack: 'string',
            description: 'string'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let data = req.body;
        let update = await db('projects').where({id:data.id}).update({...data,...updateFields(req.user)});
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
        let deletedata = await db('projects').where({id:req.body.id}).delete();
        return httpstatus.successResponse({message:deletedata?"Data Deleted Successfully":"Failed to Delete"},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
}


module.exports = {
    Project,
}