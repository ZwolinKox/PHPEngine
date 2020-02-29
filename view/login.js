$(document).ready(function(){
    $("#login-form").hide();
    $("#register-form").hide();
    $("#logo-text").hide();

    $("#logo-text").fadeIn(1000);
    $("#login-form").fadeIn(1000);
    $("#register-form").fadeIn(1000);
  })


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#login-button').addEventListener('click', () => {

        let data = {
            login : document.querySelector('#loginL').value,
            password : document.querySelector('#passwordL').value,
        }

        fetch('loginUrl', {
            method : "post",
            body : JSON.stringify(data)
        }).then(res => res.json())
        .then(res => {
            if(res = "success")
                 console.log('Login success')
            else
                document.querySelector("#login-error").innerHTML = "Login error!";

        }).catch(error => {
            document.querySelector("#login-error").innerHTML = "API call error! Status: " + error;
        })
    })

    document.querySelector('#register-button').addEventListener('click', () => {

        let data = {
            login : document.querySelector('#login').value,
            password : document.querySelector('#password').value,
        }

        fetch('registerUrl', {
            method : "post",
            body : JSON.stringify(data)
        }).then(res => res.json())
        .then(res => {
            if(res = "success")
                 console.log('Register success')
            else
                document.querySelector("#register-error").innerHTML = "Register error!";

        }).catch(error => {
            document.querySelector("#register-error").innerHTML = "API call error! Status: " + error;
        })
    })
})