const httpstatus = require("../utils/httpstatus"),
db = require("../config/mysql").knex,
{updateFields,insertFields,extractExistingColumns} = require("../utils/common"),
{ v4: uuidv4 } = require('uuid'),
fs = require('fs'),
path = require('path'),
{ Readable } = require('stream'),
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
            server_code:uuidv4(),
            ...insertFields(req.user)
        });
        return httpstatus.successResponse({message:insert?"Data Inserted Successfully":"Failed to Insert",id:insert[0]},res);
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


class MockServerRequests {
    async create(req,res){
    try{    
        let rules = {  
            mock_server_id: 'required|integer',
            name: 'required|string|max:255',
            description: 'string',
            method: 'required|in:GET,POST,PUT,DELETE,PATCH',
            url_slug: 'required|string|max:255',
            response_type: 'required|string',
            response_code: 'required|integer',
            delay: 'integer|min:0',
            response: 'required|string',
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let insert = await db('MockServerRequest').insert({
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
            mock_server_id: 'integer',
            name: 'string|max:255',
            description: 'string',
            method: 'in:GET,POST,PUT,DELETE,PATCH',
            url_slug: 'string|max:255',
            response_type: 'string',
            response_code: 'integer',
            delay: 'integer|min:0',
            response: 'string',
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let reqdata = await extractExistingColumns('MockServerRequest',req.body,'msr');
        let read = await db('MockServerRequest as msr')
        .select('msr.*',db.raw(`CONCAT('${process.env.API_URL+process.env.MOCK_SERVER_PREFIX}', ms.server_code,'/',msr.url_slug) as full_mock_url`))
        .leftJoin('MockServer as ms', 'msr.mock_server_id', 'ms.id').where(reqdata);
        // let read = await db('MockServerRequest').where(reqdata)
        return httpstatus.successResponse({count:read.length,data:read},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async update(req,res){
    try{    
        let rules = {  
            id: 'required|integer',
            mock_server_id: 'required|integer',
            name: 'required|string|max:255',
            description: 'string',
            method: 'required|in:GET,POST,PUT,DELETE,PATCH',
            url_slug: 'required|string|max:255',
            response_type: 'required|string',
            response_code: 'required|integer',
            delay: 'integer|min:0',
            response: 'required|string',
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        let data = await extractExistingColumns('MockServerRequest',req.body);
        console.log("📢[:64]: data: ", data);
        let update = await db('MockServerRequest').where({id:data.id}).update({...data,...updateFields(req.user)});
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
        let deletedata = await db('MockServerRequest').where({id:req.body.id}).delete();
        return httpstatus.successResponse({message:deletedata?"Data Deleted Successfully":"Failed to Delete"},res);
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
}

class MockAPICall {
    async mockrequestCall(req,res){
        try {
            const { server_code, slug } = req.params;
        
            const getMockAPICall = await db('MockServerRequest as msr')
                .leftJoin('MockServer as ms', 'msr.mock_server_id', 'ms.id')
                .where({ 'ms.server_code': server_code, 'msr.url_slug': slug, 'msr.method':req.method })
                .first();
        
            if (getMockAPICall) {
                const delay = getMockAPICall.delay || 0;  // Default delay if not specified in the DB
        
                setTimeout(() => {
                    return res.status(getMockAPICall.response_code).send(getMockAPICall.response);
                }, delay);
        
            } else {
                return res.status(404).json({
                    status: "Not Found",
                    message: "Endpoint Not Found"
                });
            }
        
        } catch (error) {
                return res.status(500).json({
                status: "error",
                message: "An internal server error occurred",
                error: error.message
            });
        }    
    }
}

class MockPostman {
    async downloadPostman(req,res) {
        const { server_code, slug } = req.params;

        const mockServer = await db('MockServer').where({server_code}).first();
        const mockData = await db('MockServerRequest as msr')
        .select('msr.*',db.raw(`CONCAT('${process.env.API_URL+process.env.MOCK_SERVER_PREFIX}', ms.server_code,'/',msr.url_slug) as full_mock_url`))
        .leftJoin('MockServer as ms', 'msr.mock_server_id', 'ms.id').where({'ms.server_code':server_code});

        // Generate Postman collection structure
        const postmanCollection = {
        info: {
            name: mockServer.name,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: mockData.map((mock) => ({
            name: mock.name,
            request: {
            method: mock.method,
            header: [
                {
                key: 'Content-Type',
                value: mock.response_type || 'application/json'
                }
            ],
            url:mock.full_mock_url,
            description: mock.description || '',
            },
            response: [
            {
                name: mock.name,
                originalRequest: {
                method: mock.method,
                url:mock.full_mock_url
                },
                status: mock.response_code,
                code: mock.response_code,
                _postman_previewlanguage: 'json',
                header: [
                {
                    key: 'Content-Type',
                    value: mock.response_type || 'application/json'
                }
                ],
                body: mock.response
            }
            ]
        })),
        };

        const fileName = `${mockServer.name}-mock-server-postman-collection.json`;
        const fileContent = JSON.stringify(postmanCollection, null, 2);
        
        // Convert file content to a readable stream
        const fileStream = new Readable();
        fileStream.push(fileContent);
        fileStream.push(null); // Signify the end of the stream
        
        // Set the headers to trigger a download in the browser
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/json');
        
        // Pipe the stream to the response
        fileStream.pipe(res);
    }
}

module.exports = {
    MockServer,
    MockServerRequests,
    MockAPICall,
    MockPostman,
}