window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers:{
                'Authorization':"bearer "+localStorage.getItem("token")
            }
        }
        loadEmployees();
        document.getElementById("btn-registrar").addEventListener('click',registrar);
        document.getElementById("btn-eliminar").addEventListener('click',eliminar);
    }
    else{
        window.location.href = "index.html";
    }
}

function loadEmployees(){
    axios.get(url + "/empleados",headers)
    .then(function(res){
        displayEmployees(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}


function displayEmployees(empleados){
    var body = document.querySelector("body");
    for(var i = 0; i < empleados.length; i++){
        body.innerHTML += `<h3>${empleados[i].nombre}</h3>`
    }
}

function registrar(){
    var nombre = document.getElementById('input-nombre').value;
    var apellidoPaterno = document.getElementById('input-apellidoP').value;
    var apellidoMaterno = document.getElementById('input-apellidoM').value;
    var telefono = document.getElementById('input-telefono').value;
    var correo = document.getElementById('input-mail').value;
    var direccion = document.getElementById('input-direccion').value;
    axios({
        method: 'post',
        url: 'http://localhost:3000/empleados/agregar',
        data: {
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            telefono: telefono,
            correo: correo,
            direccion: direccion
        },
        headers:{
            'Authorization':"bearer "+localStorage.getItem("token")
        }
    }).then(function(res){
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "dashboard.html";
    }).catch(function(err){
        console.log(err);
    })
}

function eliminar(){
    var idEmpleado = document.getElementById('input-id').value;
    axios({
        method:'delete',
        url: 'http://localhost:3000/empleados/eliminar',
        data: {
            id: idEmpleado
        },
        headers:{
            'Authorization':"bearer "+localStorage.getItem("token")
        }
    }).then(function(res){
        console.log(res);
        alert("Eliminado Exitosamente");
        window.location.href = "dashboard.html";
    }).catch(function(err){
        alert(err.message);
    })
}
function buscar(){
    var nombre = document.getElementById('input-buscar').value;
    axios({
        method:'post',
        url: 'http://localhost:3000/empleados/buscar',
        data: {
            nombre: nombre
        },
        headers:{
            'Authorization':"bearer "+localStorage.getItem("token")
        }
    }).then(function(res){
        console.log(res);
        displayEmployees(res.data.message);
    }).catch(function(err){
        alert(err.message);
    })
}
function modificar(){
    var id = document.getElementById('input-buscarid').value;
    if(document.getElementById('input-idE') && document.getElementById('input-idE').value!=null){
        console.log("hola");
        var idE = document.getElementById('input-idE').value;
        var nom = document.getElementById('input-nom').value;
        var apellp = document.getElementById('input-apellp').value;
        var apellm = document.getElementById('input-apellm').value;
        var corr = document.getElementById('input-corr').value;
        var tel = document.getElementById('input-tel').value;
        var dir = document.getElementById('input-dir').value;
        axios({
            method:'post',
            url: 'http://localhost:3000/empleados/modificar',
            data: {
                id: idE,
                nombre: nom,
                apellidoPaterno: apellp,
                apellidoMaterno: apellm,
                telefono: tel,
                correo: corr,
                direccion: dir
            },
            headers:{
                'Authorization':"bearer "+localStorage.getItem("token")
            }
        }).then(function(res){
            console.log(res.data.message);
            alert("Modificado exitosamente");
            document.getElementById('input-idE').value=null;
            document.getElementById('input-nom').value="";
            document.getElementById('input-apellp').value="";
            document.getElementById('input-apellm').value="";
            document.getElementById('input-corr').value="";
            document.getElementById('input-tel').value="";
            document.getElementById('input-dir').value="";
        }).catch(function(err){
            alert(err.message);
        })
    }
    else{
        alert("Selecciona id de un empleado primero")
    }
}
function buscarid(){
    var id = document.getElementById('input-buscarid').value;
    axios({
        method:'post',
        url: 'http://localhost:3000/empleados/buscarid',
        data: {
            id: id
        },
        headers:{
            'Authorization':"bearer "+localStorage.getItem("token")
        }
    }).then(function(res){
        console.log(res.data.message);
        inputs(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}
function inputs(empleado){
    var body = document.querySelector("body");
    document.getElementById('input-buscarid').value=null;
    if(document.getElementById('btn-modificar')){
        document.getElementById('input-idE').value=empleado[0].idEmpleado;
        document.getElementById('input-nom').value=empleado[0].nombre;
        document.getElementById('input-apellp').value=empleado[0].apellidoPaterno;
        document.getElementById('input-apellm').value=empleado[0].apellidoMaterno;
        document.getElementById('input-corr').value=empleado[0].correo;
        document.getElementById('input-tel').value=empleado[0].telefono;
        document.getElementById('input-dir').value=empleado[0].direccion;
    }
    else{
        body.innerHTML += `<form name="mod">`
        console.log(empleado[0].idEmpleado);
        body.innerHTML += `<input type=number id="input-idE" name="id" readonly=readonly value='${empleado[0].idEmpleado}'>`
        body.innerHTML += `<input type=text id="input-nom" name="nombre" value='${empleado[0].nombre}'>`
        body.innerHTML += `<input type=text id="input-apellp" name="apellidoP" value='${empleado[0].apellidoPaterno}'>`
        body.innerHTML += `<input type=text id="input-apellm" name="apellidoM" value='${empleado[0].apellidoMaterno}'>`
        body.innerHTML += `<input type=text id="input-corr" name="correo" value='${empleado[0].correo}'>`
        body.innerHTML += `<input type=text id="input-dir" name="direccion" value='${empleado[0].direccion}'>`
        body.innerHTML += `<input type=text id="input-tel" name="telefono" value='${empleado[0].telefono}'>`
        body.innerHTML += `</form>`
        body.innerHTML += `<button id="btn-modificar" onclick="modificar();">Modificar</button>`
    }
}
function cerrar(){
    localStorage.removeItem("token");
            window.location.href = "./login.html"
}