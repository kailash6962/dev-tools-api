const httpstatus = require("../utils/httpstatus"),
db = require("../config/mysql").knex,
bcrypt = require("bcryptjs"),
jwt = require("jsonwebtoken"),
validator = require("../utils/validator");


class Auth {
    async register(req,res){
    try{    
        let rules = {  
            first_name: 'required|string',
            last_name: 'required|string',
            companmy: 'string',
            email: 'required|email',
            password: 'required|string',
        }
        if(validator.validate(req,res,rules))
        return;
        let data = req.body;
        
        // code block {
        
        const existingUser = await db('users').where({ email:data.email }).first();
        if (existingUser) {
            return httpstatus.invalidInputResponse('User already exists',res);
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        let insert = await db('users').insert({...data,password:hashedPassword});
        return httpstatus.successResponse('User registered successfully',res);

        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async sendOtp(req,res){
    try{    
        let rules = {  
            email: 'required|email',
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        const { email } = req.body;
        const otp = process.env.DUMMY_OTP || Math.floor(100000 + Math.random() * 900000);
        const checkUser = await db('users').where({ email });
        if (checkUser) {
            let update = await db('users').where({ email }).update({otp});
            return httpstatus.successResponse('OTP sent successfully',res);
        }else{
            return httpstatus.invalidInputResponse('User not exists',res);
        }
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async verifyOtp(req,res){
    try{    
        let rules = {  
            email: 'required|email',
            otp: 'required|string|max:6',
        }
        if(validator.validate(req,res,rules))
        return;
        
        // code block {
        const { email, otp } = req.body;
        const checkUser = await db('users').where({ email }).first();
        if(checkUser.otp!=otp)
            return httpstatus.invalidInputResponse({error:'Invalid OTP'},res);
        if (checkUser) {
            let update = await db('users').update({otp_verified:1,is_active:1}).where({ email, otp });
            return httpstatus.successResponse('OTP verified successfully',res);
        }else{
            return httpstatus.invalidInputResponse('User not exists',res);
        }
        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
    async login(req,res){
    try{    
        let rules = {  
            email: 'required|email',
            password: 'required|string',
        }
        if(validator.validate(req,res,rules))
        return;

        const { email, password } = req.body;
        
        // code block {

        const user = await db('users').where({ email }).first();
        if (!user) {
        return httpstatus.invalidInputResponse({type:"invalid",message:'Invalid credentials'},res);
        }
        if (!user.otp_verified) {
        return httpstatus.invalidInputResponse({type:"otpnotverified",message:'OTP verification pending'},res);
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return httpstatus.invalidInputResponse({type:"invalid",message:'Invalid credentials'},res);
        }

        // Create JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
        delete user.password;
        return httpstatus.successResponse({ message: 'Login successful', token, user },res);

        // code block }


    } catch(e) { console.log(e); return httpstatus.errorResponse(e, res)}
    }
}


module.exports = {
    Auth,
}