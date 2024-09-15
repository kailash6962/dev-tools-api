const httpstatus = require("../utils/httpstatus"),
db = require("../config/mysql").knex,
validator = require("../utils/validator");


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


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
}

class MySqlCRUD {
    async create(req,res){
    try{    
        let rules = {  
            name: 'required|string',
            age: 'required|integer',
            mobile: 'required|integer'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let insert = await db('sampleusers').insert(req.body);
        return httpstatus.successResponse(insert?"Data Inserted Successfully":"Failed to Insert",res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async read(req,res){
    try{    
        let rules = {  
            name: 'string',
            age: 'integer',
            mobile: 'integer'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let read = await db('sampleusers').where(req.body);
        return httpstatus.successResponse(read.length>0?{count:read.length,data:read}:{count:read.length,data:"No Data Found"},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async update(req,res){
    try{    
        let rules = {  
            id: 'required|integer',
            name: 'string',
            age: 'integer',
            mobile: 'integer'
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let data = req.body;
        data.updated_at = db.fn.now();
        let update = await db('sampleusers').where({id:data.id}).update(data);
        return httpstatus.successResponse(update?"Data Updated Successfully":"Failed to Update",res);
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
        let deletedata = await db('sampleusers').where({id:req.body.id}).delete();
        return httpstatus.successResponse(deletedata?"Data Deleted Successfully":"Failed to Delete",res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
}

module.exports = {
    Sample,
    MySqlCRUD
}