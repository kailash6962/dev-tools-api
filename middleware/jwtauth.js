const httpstatus = require("../utils/httpstatus");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
      return httpstatus.invalidInputResponse('Access denied, token missing!',res);
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return httpstatus.errorResponse({code:"INVAUTH",message:'Invalid token!'},res);
      }
  
      req.user = user;
      next();
    });
}

module.exports = { auth };