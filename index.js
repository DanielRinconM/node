//Dependencias
const morgan = require("morgan");
const express = require('express');
const app = express();
//Routes
const empleados = require('./routes/empleados');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors.js');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get("/",index);
app.use("/user",user);
app.use(auth);
app.use("/empleados",empleados);
app.use(notFound);

app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running...");
});