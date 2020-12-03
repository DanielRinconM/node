window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployees();
        document.getElementById("btn-registrar").addEventListener('click', registrar);
        document.getElementById("btn-eliminar").addEventListener('click', eliminar);
    }
    else {
        window.location.href = "index.html";
    }
}

function loadEmployees() {
    axios.get(url + "/empleados", headers)
        .then(function (res) {
            displayEmployees(res.data.message);
        }).catch(function (err) {
            console.log(err);
        })
}


function displayEmployees(empleados) {
    $("#body_table_empleados").html("");
    $("#table_empleados").DataTable().clear();
    $("#table_empleados").DataTable().destroy();

    for (var i = 0; i < empleados.length; i++) {
        $("#body_table_empleados").append(
            '<tr>' +
            '<td>' + empleados[i].idEmpleado + '</td>' +
            '<td>' + empleados[i].nombre + '</td>' +
            '<td>' + empleados[i].apellidoPaterno + '</td>' +
            '<td>' + empleados[i].apellidoMaterno + '</td>' +
            '<td style="width: 200px !important"><button class="btn btn-warning" style="width:80px !important;" onclick="editar_empleado(' + empleados[i].idEmpleado + ')">Editar</button>' +
            '<button class="btn btn-danger" style="width:80px !important;float: right;" onclick="eliminar(' + empleados[i].idEmpleado + ')">Eliminar</button></td>' +
            '</tr>'
        )
    }
    $('#table_empleados').DataTable();

}

function registrar() {
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
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function (res) {
        console.log(res);
        limpiar_registro();
        Swal.fire({
            title: 'Registrado con éxito!',
            icon:'success',
            showConfirmButton: false,
            timer: 1500,
        });
        loadEmployees();
    }).catch(function (err) {
        console.log(err);
    })
}

function eliminar(id) {
    Swal.fire({
        title: 'Estás seguro que deseas eliminar este empleado???',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Emilinar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                method: 'delete',
                url: 'http://localhost:3000/empleados/eliminar',
                data: {
                    id: id
                },
                headers: {
                    'Authorization': "bearer " + localStorage.getItem("token")
                }
            }).then(function (res) {
                console.log(res);
                Swal.fire({
                    title: 'Elimindado con éxito!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                loadEmployees();
               
            }).catch(function (err) {
                alert(err.message);
            })
            
        } 
    })
    
}
function buscar() {
    var nombre = document.getElementById('input-buscar').value;
    axios({
        method: 'post',
        url: 'http://localhost:3000/empleados/buscar',
        data: {
            nombre: nombre
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function (res) {
        console.log(res);
        displayEmployees(res.data.message);
    }).catch(function (err) {
        alert(err.message);
    })
}
function modificar() {
    if (document.getElementById('input_idE') && document.getElementById('input_idE').value != null) {
        var idE = document.getElementById('input_idE').value;
        var nom = document.getElementById('input_nom').value;
        var apellp = document.getElementById('input_apellp').value;
        var apellm = document.getElementById('input_apellm').value;
        var corr = document.getElementById('input_corr').value;
        var tel = document.getElementById('input_tel').value;
        var dir = document.getElementById('input_dir').value;
        axios({
            method: 'post',
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
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }).then(function (res) {
            $("#modal_editar_empleado").modal('hide');
            Swal.fire({
                title: 'Modificado con éxito!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById('input_idE').value = null;
            document.getElementById('input_nom').value = "";
            document.getElementById('input_apellp').value = "";
            document.getElementById('input_apellm').value = "";
            document.getElementById('input_corr').value = "";
            document.getElementById('input_tel').value = "";
            document.getElementById('input_dir').value = "";

            loadEmployees();
        }).catch(function (err) {
            alert(err.message);
        })
    }
}
function buscarid(id) {
    axios({
        method: 'post',
        url: 'http://localhost:3000/empleados/buscarid',
        data: {
            id: id
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }).then(function (res) {
        console.log(res.data.message);
        inputs(res.data.message);
    }).catch(function (err) {
        console.log(err);
    })
}
function inputs(empleado) {
    console.log(empleado)
    data = empleado[0];
    $('#input_idE').val(data.idEmpleado);
    $('#input_nom').val(data.nombre);
    document.getElementById('input_apellp').value = data.apellidoPaterno;
    document.getElementById('input_apellm').value = data.apellidoMaterno;
    document.getElementById('input_corr').value = data.correo;
    document.getElementById('input_tel').value = data.telefono;
    document.getElementById('input_dir').value = data.direccion;

}
function cerrar() {
    localStorage.removeItem("token");
    window.location.href = "./login.html"
}

function editar_empleado(id) {
    buscarid(id);
    $("#modal_editar_empleado").modal('show');

}

function limpiar_registro(){
    document.getElementById('input-nombre').value="";
    document.getElementById('input-apellidoP').value="";
    document.getElementById('input-apellidoM').value="";
    document.getElementById('input-telefono').value="";
    document.getElementById('input-mail').value="";
    document.getElementById('input-direccion').value="";
}