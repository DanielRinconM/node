window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.getElementById('btn-info').addEventListener('click',login);
    }
    else{
        window.location.href = "dashboard.html"
    }
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;
    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: password
        }
    }).then(function(res){
        if(res.data.code == 200){
            localStorage.setItem("token",res.data.message);
            window.location.href = "./dashboard.html"
        }
        else{
            alert("correo electrónico y/o contraseña incorrectos")
        }
    }).catch(function(err){
        console.log(err);
    })
}