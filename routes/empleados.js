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

empleados.delete("/eliminar", async (req,res,next) =>{
    const {id}=req.body;
    if(id){
            const query = `DELETE FROM empleados WHERE idEmpleado = ${id}`;
            const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Empleado borrado correctamente"});
        }
        return res.status(404).json({code:404, message: "Empleado no encontrado"});
    }
    return res.status(500).json({code:500, message:"Campo incompleto"});
});
empleados.post("/buscar", async (req,res,next) =>{
    const {nombre}=req.body;
    if(nombre){
            const query = `SELECT * FROM empleados WHERE nombre = '${nombre}';`;
            const rows = await db.query(query);
        if(query){
            return res.status(200).json({code:200, message: rows});
        }
        return res.status(404).json({code:404, message: "Empleado no encontrado"});
    } 
    return res.status(500).json({code:500, message:"Campo incompleto"});
});
empleados.post("/buscarid", async (req,res,next) =>{
    const {id}=req.body;
    if(id){
            const query = `SELECT * FROM empleados WHERE idEmpleado = '${id}';`;
            const rows = await db.query(query);
        if(query){
            return res.status(200).json({code:200, message: rows});
        }
        return res.status(404).json({code:404, message: "Empleado no encontrado"});
    } 
    return res.status(500).json({code:500, message:"Campo incompleto"});
});

empleados.post("/modificar",async (req,res,next)=>{
    console.log(req.body);
    const {id,nombre,apellidoPaterno,apellidoMaterno,telefono,correo,direccion} = req.body;
    if(id&&nombre && apellidoPaterno && apellidoMaterno && telefono && correo && direccion){
        let query = "UPDATE empleados";
        query+= ` SET nombre='${nombre}',apellidoPaterno='${apellidoPaterno}',apellidoMaterno='${apellidoMaterno}',telefono='${telefono}',correo='${correo}',direccion='${direccion}' WHERE idEmpleado=${id}`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code:201, message:"Empleado modificado correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrió un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletos"});
});
module.exports = empleados;
