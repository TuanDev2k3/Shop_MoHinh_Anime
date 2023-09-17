
listAccess.forEach(access => AddProduct(access))
PageIndex(1, 8)

function FormatPrice(n) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Sort theo Type
function SortType(type) {
    let content = document.getElementById('products')
    while(content.hasChildNodes()){
        content.removeChild(content.firstChild);
    }
    listAccess.forEach(product => {
        if (type === product.type)
            AddProduct(product)
    })

    if (type === "All") {
        listAccess.forEach(product => AddProduct(product))
        PageIndex(1, 8)
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

// ====== Chuc Nang Search =====
function SearchData(){
    let value = document.querySelector('#search input').value.trim().toLowerCase()
    let content = document.getElementById('products')
    while(content.hasChildNodes()){
        content.removeChild(content.firstChild);
    }

    listAccess.forEach(product =>{
        if (product.name.toLowerCase().includes(value))
            AddProduct(product)
    })
    // Close Box Search
    document.getElementById('search').classList.remove('open')
}
