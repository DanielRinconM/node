const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/login",async (req,res,next)=>{
    const {user_mail,user_password} = req.body;
    const query = `SELECT * FROM administradores WHERE correo = '${user_mail}' AND password = '${user_password}';`;
    const rows = await db.query(query);
    if(user_mail && user_password){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id:rows[0].idAdministrador,
                user_mail:rows[0].correo
            },"debugkey");
            return res.status(200).json({code:200,message:token});
        }else{
            return res.status(200).json({code:401,message:"correo electrónico y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});

});

module.exports = user;