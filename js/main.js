
// Gioi thieu (Select Image)
document.querySelectorAll('#gallery + div > img').forEach(item =>{
    item.addEventListener('click', function(){
        document.getElementById('gallery').src = this.src
    })
})

// Menu Navbar
let menu = document.getElementById('menu')
menu.addEventListener('click', ()=>{
    if (menu.classList.contains('bx-menu')){
        menu.classList.add('bx-x')
        menu.classList.remove('bx-menu')
    }
    else{
        menu.classList.remove('bx-x')
        menu.classList.add('bx-menu')
    }
       
    document.querySelector('nav').classList.toggle('open')
})

