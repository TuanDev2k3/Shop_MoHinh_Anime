if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else { 
    ready();  
}

function ready(){
    LoadNewProduct()
}

function LoadNewProduct(){
    let index = Math.floor(Math.random() * 16)
    let num = 0

    while (index >= 0 && num < 5) {
        AddProduct(listProduct[index + 8])
        AddProduct(listAccess[index])
        index -= 1
        num += 1
    }
    document.querySelector('h1').innerHTML = `Có ${num*2} sản phẩm vừa được cập nhật`
}