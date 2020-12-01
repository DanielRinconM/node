const express = require('express');
const empleados = express.Router();
const db = require('../config/database')

empleados.post("/agregar",async (req,res,next)=>{
    const {nombre,apellidoPaterno,apellidoMaterno,telefono,correo,direccion} = req.body;
    if(nombre && apellidoPaterno && apellidoMaterno && telefono && correo && direccion){
        let query = "INSERT INTO empleados";
        query+= ` VALUES ('','${nombre}','${apellidoPaterno}','${apellidoMaterno}','${telefono}','${correo}','${direccion}')`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code:201, message:"Empleado insertado correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrió un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletos"});
});

empleados.get("/", async (req,res,next)=>{
    const pkmn = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code:200,message:pkmn});
});

module.exports = empleados;
