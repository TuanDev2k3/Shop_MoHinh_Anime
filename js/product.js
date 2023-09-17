
// Load product tu list vao website
RanDomProduct()
listProduct.forEach(product=>AddProduct(product))
PageIndex(1, 12)
// listProduct.forEach(pro => AddProduct(pro))

function RanDomProduct() {
    let index, temp, length = listProduct.length

    while (length > 0) {
        index = Math.floor(Math.random() * length)
        length--

        // Hoan doi vi tri product
        temp = listProduct[index]
        listProduct[index] = listProduct[length]
        listProduct[length] = temp
    }
    return listProduct
}

function FormatPrice(n) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Sort theo Type
function SortType(type) {
    let content = document.getElementById('products')
    while(content.hasChildNodes()){
        content.removeChild(content.firstChild);
    }
    listProduct.forEach(product => {
        if (type === product.type)
            AddProduct(product)
    })

    if (type === "All") {
        listProduct.forEach(product=>AddProduct(product))
        PageIndex(1, 12)
    }
}
// Sort theo Price (Gia)
function SortPrice(price){
    let content = document.getElementById('products')
    while(content.hasChildNodes()){
        content.removeChild(content.firstChild);
    }
    switch (price){
        case "-1tr": {
            listProduct.forEach(product => {
                let price = parseInt(product.price)
                if (price < 1000000)
                    AddProduct(product)
            })
            break
        }
        case "-2tr": {
            listProduct.forEach(product => {
                let price = parseInt(product.price)
                if (price >= 1000000 && price < 2000000)
                    AddProduct(product)
            })
            break
        }
        case "+2tr": {
            listProduct.forEach(product => {
                let price = parseInt(product.price)
                if (price >= 2000000)
                    AddProduct(product)
            })
            break
        }
        case "price++": {
            listProduct.sort((a,b) => (a.price-b.price));
            listProduct.forEach(product=>AddProduct(product))
            PageIndex(1, 12)
            break
        }
        case "price--": {
            listProduct.sort((a,b) => (b.price-a.price));
            listProduct.forEach(product=>AddProduct(product))
            PageIndex(1, 12)
            break
        }

    }
}

// Open and Close Box Sort => Reponsive
let sortBox = document.getElementById('sort')
document.getElementById('sortIcon').addEventListener("click", function(){
    sortBox.classList.add('open')
})
sortBox.addEventListener('mousedown', function(){
    setTimeout(function(){
        sortBox.classList.remove('open')
    }, 100)
        
})

//===== Chuc Nang Search =======
function SearchData(){
    let value = document.querySelector('#search input').value.trim().toLowerCase()
    let content = document.getElementById('products')
    while(content.hasChildNodes()){
        content.removeChild(content.firstChild);
    }

    listProduct.forEach(product =>{
        if (product.name.toLowerCase().includes(value))
            AddProduct(product)
    })
    // Close Box Search
    document.getElementById('search').classList.remove('open')
}