// Change Login App And Sign App
function LoginOrSign(text){
    if (text === "sign"){
        document.getElementById('sign').classList.remove('hidden')
        document.getElementById('login').classList.add('hidden')
    }
    else{
        document.getElementById('sign').classList.add('hidden')
        document.getElementById('login').classList.remove('hidden')
    }
}

// ======== Kiem tra Input Cua Login Va Sign ==========
function showError(input) {
    let parent = input.parentElement;
    let icon = parent.querySelector('i')
    parent.classList.add('error');
    icon.classList.add('show')
}

function showSuccess(input) {
    let parent = input.parentElement;
    let icon = parent.querySelector('i')
    parent.classList.remove('error');
    icon.classList.remove('show');
}

function checkLength(input) {
    input.value = input.value.trim()
    if (input.value.length < 8) {
        showError(input);
        return true
    }
    else if (input.value.length > 15) {
        showError(input);
        return true
    }
    else {
        showSuccess(input)
        return false
    }
}

function checkPassword(value_1, value_2) {
    value_1.value = value_1.value.trim()
    value_2.value = value_2.value.trim()

    if (value_1.value === value_2.value) {
        return true
    }
    else return false
}

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else { 
    ready();  
}

function ready(){
    UpdateIsLogin()
}

let login = document.getElementById('login')
let sign = document.getElementById('sign')

// Check Error Cua Login And Sign Khi Nhap Thong Tin
login.querySelector('.idName').addEventListener('input', ()=>{
    checkLength(login.querySelector('.idName'))
})
login.querySelector('.idPass').addEventListener('input', ()=>{
    checkLength(login.querySelector('.idPass'))
})
sign.querySelector('.idName').addEventListener('input', ()=>{
    checkLength(sign.querySelector('.idName'))
})
sign.querySelector('.idPass').addEventListener('input', ()=>{
    checkLength(sign.querySelector('.idPass'))
})
sign.querySelector('.idPass2').addEventListener('input', ()=>{
    checkLength(sign.querySelector('.idPass2'))
})

// Sign Up Account (Dang ki tai khoan)
let UserList = []
function SignUpAccount(e) {
    let idName = sign.querySelector('.idName');
    let idPass = sign.querySelector('.idPass');
    let idPass2 = sign.querySelector('.idPass2');

    if (!checkLength(idName) && !checkLength(idPass)
        && checkPassword(idPass, idPass2)) {
        let item = {
            id: idName.value.trim(),
            pass: idPass.value.trim()
        }
        UserList.push(item)
        localStorage.setItem('userItem', JSON.stringify(UserList))
        CreateNotify("true", "Đăng kí tài khoản thành công");
        idName.value = idPass.value = idPass.value = ""
    }
    else {
        idPass.value = idPass2.value = ""
        CreateNotify("false", "Đăng kí tài khoản thất bại");
    }
}

// Login Up Account (Dang nhap tai khoan)
let isLogin = false
function LoginUpAccount(e){
    let idName = login.querySelector('.idName');
    let idPass = login.querySelector('.idPass');
    let account = JSON.parse(localStorage.getItem('userItem'))

    if (account) {
        account.forEach(item => {
            if (idName.value === item.id && idPass.value === item.pass) {
                isLogin = true
                CreateNotify("true", "Đăng nhập thành công");
                localStorage.setItem('userName', item.id)
                localStorage.setItem('isLogin', isLogin)
                setTimeout(()=>{
                    IsLoginTrue()
                    idName.value = idPass.value = ''
                }, 3000)
                
            }
        })
    }

    if (!isLogin) {
        CreateNotify("false", "Đăng nhập thất bại");
        idPass.value = ''
    }
        
}

function IsLoginTrue(){
    let userName = localStorage.getItem('userName')
    document.querySelector('#profile h1').innerHTML = userName
    document.getElementById('profile').classList.remove('hidden')
}

function IsLoginFalse(){
    isLogin = false
    document.getElementById('profile').classList.add('hidden')
    localStorage.setItem('isLogin', isLogin)
}

function UpdateIsLogin(){
    // Kiem tra trang thai dang nhap (Login Up)
    let isLogin = localStorage.getItem('isLogin')
    if (isLogin === "true"){
        IsLoginTrue()
    }
}