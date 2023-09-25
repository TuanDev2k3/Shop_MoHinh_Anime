if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else { 
    ready();  
}

function ready(){
    LoadToPays()
    document.getElementById('BtnPay').addEventListener('click', ThanhToan)
}

function LoadToPays(){
    let listCart = JSON.parse(localStorage.getItem('ListCart'))
    if (listCart) {
        listCart.forEach(item =>{
            AddProductToPays(item.title, item.price, item.img, item.quantity)
        })
    }
}

function AddProductToPays(title, price, img, quantity){
    let Content = document.getElementById('pays-content')
    // Xoa dau (.) trong price
    price = parseFloat(price.replace(/[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g, "")) 
    let payItem = document.createElement('div')
    payItem.className = "flex justify-between items-center sm:gap-10 gap-5 p-2 border-y border-[#aaa]"
    payItem.innerHTML = `<div class="flex items-center sm:gap-2 gap-1">
    <img src="${img}" class="sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] object-cover object-center p-2">
    <div>
        <h3 class="sm:text-[18px] text-[16px] text-gray-600 font-bold line-clamp-1">${title}</h3>
        <h4 class="sm:text-[17px] text-[14px] text-red-600">Giá: ${FormatPrice(price.toString())}₫</h4>
        <span class="text-blue-600" sm:text-[16px] text-[10px]>Số lượng: ${quantity}</span>
    </div>
    </div>
    <h2 class="text-green-600 sm:text-[20px] text-[16px] mr-2">${FormatPrice((price*quantity).toString())}₫</h2>`

    Content.appendChild(payItem)
    document.querySelector('#pricePay span').innerHTML = document.getElementById('total').innerHTML
}

function ThanhToan(e){
    let btn = e.target.parentElement
    let inputs = btn.querySelectorAll('input')

    // Kiem tra da nhap du thong tin chua
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim()){
            CreateNotify("false", "Thông tin chưa đầy đủ");
            return;
        }
    }

    var CartContent = document.querySelector('#cart-content');
    while (CartContent.hasChildNodes()){
        CartContent.removeChild(CartContent.firstChild)
    }
    UpdateTotal();
    SaveCart();
    window.location.href = "./index.html"
}