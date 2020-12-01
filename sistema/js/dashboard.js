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