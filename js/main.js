
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

// Add San Pham Tu Data.js vao trang HTML
function AddProduct(product) {
    let proItem = document.createElement('div')
    proItem.className = 'bg-white shadow-[0_0_15px_#bbb] max-h-[330px] hover:shadow-[0px_0px_10px_#454545] animate-[fadeIn_.5s_linear] duration-300 relative'
    proItem.innerHTML = `
            <div class="w-full max-h-[200px] overflow-hidden">
                <img src="${product.image}" 
                    class="w-full h-full object-cover object-top scale-100 hover:scale-125 duration-500">
            </div>
            <h3 class="mb-4 mt-2 px-2 text-base cursor-pointer line-clamp-2 hover:text-gray-700" title="${product.name}">${product.name}</h3>
            <h4 class="px-2 pb-3 pt-4 text-[17px] border-t border-[#aaa] font-bold text-[#ff0000]">${FormatPrice(product.price)}₫</h4>
            <i class='bx bxs-plus-circle md:text-[32px] text-[28px] text-green-600 absolute bottom-[10px] right-2 cursor-pointer
              active:text-red-600' title="Add To Cart"></i>`
    
    document.getElementById('products').appendChild(proItem)
    proItem.querySelector('i').addEventListener('click', AddCartClick)
    proItem.querySelector('h3').addEventListener('click', AddToDetail)
}

//============ ADD TO CART ===========

if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else { 
    ready();  
}
function ready(){
    // Open And Close Account (Tai Khoan)
    document.querySelector('.icons i:nth-child(3)').addEventListener('click', ()=>{
        window.location.href = "./account.html"
    })

    CreateLoader();
    CreateNotifyBox();
    CreateSearchBox();
    CreateCartBox();
    CreateDetailBox();
    LoadToCart();
}

// Create Elements
function CreateNotifyBox(){
    let notifys = document.createElement('section')
    notifys.className = "fixed top-20 left-2 z-50"
    notifys.setAttribute("id", "notifys")
    document.body.appendChild(notifys)
}

function CreateLoader(){
    let load = document.getElementById('loader')
    load.innerHTML = ` <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_3_0.1s]"></div>
            <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_infinite_0.2s]"></div>
            <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_infinite_0.3s]"></div>
            <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_infinite_0.4s]"></div>
            <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_infinite_0.5s]"></div>
            <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_infinite_0.6s]"></div>
            <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_infinite_0.7s]"></div>
            <div class="md:w-[12px] w-[6px] md:h-[75px] h-[50px] inline-block origin-[bottom_center] rounded-[20px] animate-[loader_1.2s_linear_infinite_0.8s]"></div>`

    setTimeout(function(){
        document.getElementById('loader').classList.remove('flex')
        document.getElementById('loader').classList.add('hidden')
    }, 3200)
}

function CreateSearchBox(){
    let search = document.createElement('section')
    search.className = "fixed top-0 scale-50 opacity-0 pointer-events-none left-0 bg-[#000000de] w-full min-h-screen z-50 grid place-content-center"
    search.setAttribute("id", "search")
    search.innerHTML = `<i class='bx bx-x cursor-pointer select-none absolute top-5 right-6 text-5xl text-white active:text-red-600'></i>
    <h1 class="text-center text-6xl font-bold">Tìm kiếm</h1>
    <input type="search" placeholder="Bạn muốn mua gì..."
    class="md:w-[700px] w-[600px] md:h-[70px] h-[60px] rounded-md text-[20px] text-red-600 border-none outline-none p-5 m-[50px_30px]">
    <button class="w-[150px] text-white text-xl h-[50px] mx-auto bg-green-500 rounded-full 
    hover:bg-green-700" onclick="SearchData()">Search</button>`
    document.body.appendChild(search)
    search.querySelector('input').addEventListener('keydown', e=>{
        if (e.key === 'Enter'){
            SearchData()
        }
    })

    // ========== CHUC NANG SEARCH ============
    document.querySelector('.icons i:nth-child(1)').addEventListener('click', ()=>{
        document.getElementById('search').classList.add('open')
        document.querySelector('#search input').focus()
    })
    document.querySelector('#search i').addEventListener('click',()=>{
        document.getElementById('search').classList.remove('open')
        document.querySelector('#search input').value = ''
    })
}

function CreateCartBox() {
    let cart = document.createElement('section')
    cart.className = "fixed top-0 min-h-screen max-w-[400px] w-full p-5 bg-white shadow-[-1px_0_10px_#aaa]"
    cart.setAttribute("id", "cart")
    cart.innerHTML = `<h2 class="text-center text-[var(--main-color)] text-3xl font-semibold m-[2rem_0_1rem]">Giỏ hàng</h2>
    <div class="flex flex-col overflow-y-scroll max-h-[60vh]" id="cart-content">
        
    </div>
    <div class="flex justify-end mt-6 border-t border-[#000]">
        <div class="text-[1.2rem] font-semibold my-4">Tổng</div>
        <div class="text-[1.075rem] font-medium m-[1.1rem_0_0_0.7rem]" id="total">0₫</div>
    </div>
    <button class="bg-red-600 m-[1rem_auto] p-[12px_20px] w-2/4 text-center border-none outline-none 
            rounded-[2rem] text-white text-base font-medium cursor-pointer flex justify-center hover:bg-blue-700">Mua ngay</button>
    <i class='bx bx-x mx-[10px] absolute top-4 right-3 text-[2rem] text-red-600 cursor-pointer'></i>`
    document.querySelector('header').appendChild(cart)
    cart.querySelector('button').addEventListener('click', KTraThanhToan)

    // OPEN OR CLOSE CART
    document.querySelector('.icons i:nth-child(2)').addEventListener('click',()=>{
        document.getElementById('cart').classList.add('open')
    })
    document.querySelector('#cart > i').addEventListener('click', ()=>{
        document.getElementById('cart').classList.remove('open')
    })
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

function CreateDetailBox() {
    let detailbox = document.createElement('section')
    detailbox.className = "p-[0_6%] fixed scale-50 opacity-0 pointer-events-none top-0 left-0 bg-[#fff] w-full min-h-screen z-[40] grid item-center"
    detailbox.setAttribute('id', 'detailProduct')
    detailbox.innerHTML = `<i class='bx bx-x absolute top-[20%] right-0 z-[50] md:text-[40px] text-[30px] bg-red-500 cursor-pointer text-white'></i>
    <div class="relative w-full max-h-[550px] shadow-[0_0_5px_#000] flex sm:gap-2 gap-0 my-[74px]">
    <div class="lg:w-[40%] w-[30%] h-full p-0">
        <img src="https://down-vn.img.susercontent.com/file/cn-11134207-7qukw-lj9o1lz56ut676" class="w-full h-full object-cover sm:object-center object-top">
    </div>
    <div class="lg:w-[60%] w-[70%] p-6">
        <h5 class="text-blue-600 font-semibold text-[16px]">Shop mô hình TuanDeV</h5>
        <h3 class="text-[35px] text-orange-950 my-3">Mô hình Ace Hỏa Quyền Chiến Đấu, Có Led, Cao 30 cm - Mô hình One Piece</h3>
        <h4 class="text-[30px] text-red-600 font-semibold my-3">400.000₫</h4>

        <li class="text-[16px] text-[#000]"><i class='bx bxs-check-shield text-green-500 text-xl align-middle'></i> Chất liệu: PVC</li>
        <li class="text-[16px] text-[#000]"><i class='bx bxs-check-shield text-green-500 text-xl align-middle'></i> Box: Có hộp</li>
        <li class="text-[16px] text-[#000]"><i class='bx bxs-check-shield text-green-500 text-xl align-middle'></i> Kiểu: Cố định, trang trí</li>
        <li class="text-[16px] text-[#000]"><i class='bx bxs-check-shield text-green-500 text-xl align-middle'></i> Sản xuất: Việt Nam</li>
        <li class="text-[16px] text-[#000]"><i class='bx bxs-check-shield text-green-500 text-xl align-middle'></i> Tình trạng: Còn mới</li>

        <button class="md:my-6 my-3 md:w-[250px] w-[160px] md:text-[16px] text-[14px] h-[50px] bg-red-600 text-white font-semibold cursor-pointer hover:bg-red-700">Thêm vào giỏ hàng</button>
    </div>
    </div>`

    document.body.appendChild(detailbox)
    detailbox.querySelector('#detailProduct > i').addEventListener('click', () => detailbox.classList.remove('open'))
}


// Kiem tra cac dieu kien de thanh toan (dang nhap ?, cart have san pham ? )
function KTraThanhToan(){
    let isLogin = localStorage.getItem('isLogin')
        if (isLogin == "false"){
            CreateNotify("false", "Bạn chưa đăng nhập");
            setTimeout(()=>{
                window.location.href = "./account.html"
            }, 2000)
        }
        else 
        {
            var cartBoxs = cart.querySelectorAll('#cart-content > div')
            if (cartBoxs.length > 0)
                window.location.href = "./pays.html"
            else
                CreateNotify("false", "Giỏ hàng đang trống");
        }
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
    
    var cartBoxContent = `<img src="${imgProduct}" class="w-[100px] h-[100px] object-cover object-center p-2" title="Xem chi tiết">
                            <div>
                                <h3 class="text-base font-semibold uppercase line-clamp-1">${title}</h3>
                                <h4 class="font-medium">${price}</h4>
                                <input type="number" value="1" class="text-base rounded-sm border border-black outline-red-500 w-[2.5rem] text-center">
                            </div>
                            <i class='bx bx-trash text-[1.8rem] text-red-600 cursor-pointer' title="Xóa"></i>`
    CartShopBox.innerHTML = cartBoxContent;
    CartItems.appendChild(CartShopBox);
    CartShopBox.querySelectorAll('.bx-trash')[0].addEventListener('click', RemoveCart);
    CartShopBox.querySelectorAll('input')[0].addEventListener('change', quantityChanged);
    CartShopBox.querySelector('img').addEventListener('click', AddToDetail)

    UpdateTotal();
    SaveCart();
    UpdateCartIcon();
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
    UpdateCartIcon();
    UpdateTotal();
}

function UpdateCartIcon(){
    let cartBoxes = document.querySelectorAll('#cart-content > div')
    let quantity = 0

    cartBoxes.forEach(cartBox =>{
        let quantityEle = cartBox.querySelector('input').value
        quantity += parseInt(quantityEle)
    })
    document.querySelector('.icons i:nth-child(2)').setAttribute('data-quantity', quantity)
    SaveCart()
}

function PageIndex(n, max) {
    // Remove all Product
    let products = document.querySelectorAll('#products > div')
    products.forEach(product => product.classList.add('hidden'))
    // load product theo page
    let index = (n-1)*max
    while (index < n*max) {
        if(!products[index]){
            return
        }
        products[index].classList.remove('hidden')
        index++
    }
    // Create Page Icon
    PageIcon(max)
}

function PageIcon(max) {
    let pageIcon = document.createElement('div')
    pageIcon.className = 'md:text-[40px] text-[30px] col-span-full text-right cursor-pointer'
    pageIcon.innerHTML = `<button class="border-none outline-none mx-3 text-blue-600 hover:text-white" onclick="PageIndex('1', ${max})">
                        <a href="#"><i class='bx bx-chevron-left rounded-full border-2 border-blue-500 hover:bg-blue-400 duration-500'></i></a></button>
                        <button class="border-none outline-none mx-3 text-blue-600 hover:text-white" onclick="PageIndex('2', ${max})">
                        <a href="#"><i class='bx bx-chevron-right rounded-full border-2 border-blue-500 hover:bg-blue-400 duration-500'></i></a></button>`
    document.getElementById('products').appendChild(pageIcon)
}

// ==== Chi tiet san pham (Detail product) ======
function AddToDetail(event){
    var btn = event.target;
    var Products = btn.parentElement;

    var title = Products.querySelectorAll("h3")[0].innerHTML;
    var price = Products.querySelectorAll("h4")[0].innerHTML;
    var imgProduct = Products.querySelectorAll("img")[0].src;

    let Detail = document.getElementById('detailProduct')
    Detail.querySelector('h3').innerHTML = title
    Detail.querySelector('h4').innerHTML = price
    Detail.querySelector('img').src = imgProduct

    Detail.classList.add('open')
    Detail.querySelector('button').onclick = () =>{
        AddProductToCart(title, price, imgProduct)
    }
    document.getElementById('cart').classList.remove('open')
}