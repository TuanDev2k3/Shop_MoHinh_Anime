
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

//============ ADD TO CART ===========

// OPEN OR CLOSE CART
document.querySelector('.icons i:nth-child(2)').addEventListener('click',()=>{
    document.getElementById('cart').classList.add('open')
})
document.querySelector('#cart > i').addEventListener('click', ()=>{
    document.getElementById('cart').classList.remove('open')
})

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else { 
    ready();  
}
function ready(){
    // Add To cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var btn = addCart[i];
        btn.addEventListener("click", AddCartClick);
    }
    CreateNotifyBox();
    LoadToCart()
}

// Remove Cart Item
function RemoveCart(e) {
    let btnClick = e.target.parentElement
    btnClick.remove()
    SaveCart();
    UpdateTotal();
    UpdateCartIcon();
}

// Change Quantity (So Luong)
function quantityChanged(e) {
    var input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    SaveCart();
    UpdateTotal();
    UpdateCartIcon();
}

// Add Cart
function AddCartClick(event){
    var btn = event.target;
    var Products = btn.parentElement;

    var title = Products.querySelectorAll("h3")[0].innerText;
    var price = Products.querySelectorAll("h4")[0].innerText;
    var imgProduct = Products.querySelectorAll("img")[0].src;
    AddProductToCart(title, price, imgProduct);
}

function AddProductToCart(title, price, imgProduct){
    var CartShopBox = document.createElement('div');
    CartShopBox.className = 'grid grid-cols-[32%_50%_18%] items-center gap-1 mt-4';
    var CartItems = document.querySelector('#cart-content');
    var CartItemName = CartItems.querySelectorAll('h3');
    for (var i = 0; i < CartItemName.length; i++) {
        if (CartItemName[i].innerHTML == title) {
            CreateNotify("false", "Thêm không thành công");
            return;
        }
    }
    
    var cartBoxContent = `<img src="${imgProduct}" class="w-[100px] h-[100px] object-cover object-center p-2">
                            <div>
                                <h3 class="text-base font-semibold uppercase line-clamp-1">${title}</h3>
                                <h4 class="font-medium">${price}</h4>
                                <input type="number" value="1" class="text-base rounded-sm border border-black outline-red-500 w-[2.5rem] text-center">
                            </div>
                            <i class='bx bx-trash text-[1.8rem] text-red-600 cursor-pointer'></i>`
    CartShopBox.innerHTML = cartBoxContent;
    CartItems.appendChild(CartShopBox);
    CartShopBox.querySelectorAll('.bx-trash')[0].addEventListener('click', RemoveCart);
    CartShopBox.querySelectorAll('input')[0].addEventListener('change', quantityChanged);
    // CreateNotify("true", "Đã thêm thành công");

    UpdateTotal();
    SaveCart();
    UpdateCartIcon();
}

function CreateNotifyBox(){
    let notifys = document.createElement('section')
    notifys.className = "fixed top-20 left-2"
    notifys.setAttribute("id", "notifys")
    document.body.appendChild(notifys)
}

function CreateNotify(status, mess){
    let notify = document.createElement('div')
    notify.className = "sm:max-w-[320px] max-w-[250px] w-full flex items-center sm:p-5 p-3 bg-white rounded-md sm:mb-4 mb-2 relative shadow-[3px_-3px_5px_#000000c1] animate-[scrollShow_1s_linear_forwards]"
    switch (status){
        case "true":
            notify.innerHTML = `<i class='bx bxs-check-circle text-green-500 mr-[10px] sm:text-[35px] text-[25px]'></i>
                    <h3 class="text-green-500 font-medium sm:text-xl text-base">${mess}</h3>
                    <span class="absolute left-0 bottom-0 w-full h-1 animate-[countdown_2s_linear_forwards_0.5s] bg-green-500"></span>`
            break;
        case "false":
            notify.innerHTML = `<i class='bx bxs-error text-red-500 mr-[10px] sm:text-[35px] text-[25px]'></i>
                    <h3 class="text-red-500 font-medium sm:text-xl text-base">${mess}</h3>
                    <span class="absolute left-0 bottom-0 w-full h-1 animate-[countdown_2s_linear_forwards_0.5s] bg-red-500"></span>`
            break;
    }
    
    document.getElementById('notifys').appendChild(notify)
    setTimeout(function(){
        notify.remove()
    }, 3000)
}

function UpdateTotal(){
    let cartContent = document.getElementById('cart-content')
    let cartItems = cartContent.querySelectorAll('#cart-content > div')
    let total = 0
    cartItems.forEach(item =>{
        let quantity = item.querySelector('input').value
        let priceEle = item.querySelector('h4')
        // Xoa dau (.) trong price
        let price = parseFloat(priceEle.innerHTML.replace(/[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g, "")) 
        total = total + price * quantity;
        
    })
    document.getElementById('total').innerHTML = `${FormatPrice(total.toString())}₫`
}

function FormatPrice(n) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function SaveCart(){
    let cartContent = document.getElementById('cart-content')
    let cartItems = cartContent.querySelectorAll('#cart-content > div')
    let listCart = []

    cartItems.forEach(item =>{
        let titleEle = item.querySelector('h3').innerHTML;
        let priceEle = item.querySelector('h4').innerHTML;
        let quantityEle = item.querySelector('input').value;
        let imgcart = item.querySelector('img').src;

        let itemList = {
            title: titleEle,
            price: priceEle,
            quantity: quantityEle,
            img: imgcart
        };
        listCart.push(itemList)
    })
    localStorage.setItem('ListCart', JSON.stringify(listCart));
}

function LoadToCart(){
    let listCart = JSON.parse(localStorage.getItem('ListCart'))
    if (listCart) {
        listCart.forEach(item =>{
            AddProductToCart(item.title, item.price, item.img)
            
            let cartItems = document.querySelectorAll('#cart-content > div')
            let cartItem = cartItems[cartItems.length-1]
            cartItem.querySelector('input').value = item.quantity
        })
    }
}

function UpdateCartIcon(){
    let cartBoxes = document.querySelectorAll('#cart-content > div')
    let quantity = 0

    cartBoxes.forEach(cartBox =>{
        let quantityEle = cartBox.querySelector('input').value
        quantity += parseInt(quantityEle)
    })
    document.querySelector('.icons i:nth-child(2)').setAttribute('data-quantity', quantity)
}