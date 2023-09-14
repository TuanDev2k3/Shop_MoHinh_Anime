let listAccess = [
    // Ao hoodie va thun
    {
        name: "Áo Hoodie One Piece Nhân Vật Anime Phiên Bản Màu Trắng",
        image: "https://salt.tikicdn.com/ts/tmp/16/73/93/36e1efaf4a74400f9b7b3a88fa1fd399.jpg",
        type: "Hoodie",
        price: "180000"
    },
    {
        name: "Áo Hoodie Zoro One Piece Phiên Bản Màu Đen Cực Chất",
        image: "https://moveekbuddyshop.com/cdn/shop/products/hh_45921a1f-2a53-4395-8c69-429a7e746e7e_1200x.png?v=1613630169",
        type: "Hoodie",
        price: "150000"
    },
    {
        name: "Áo Hoodie In Hình One Piece 3D Thời Trang Cho Nam",
        type: "Hoodie",
        image: "https://ae01.alicdn.com/kf/H7464ac155b2d4f8eb6364fc03ba6ae34Y.jpg?width=800&height=800&hash=1600",
        price: "200000"
    },
    {
        name: "Áo Luffy Gear 5, Áo Anime One Piece Cực Ngầu, Giá Siêu Rẻ",
        image: "https://salt.tikicdn.com/cache/280x280/ts/product/d7/9a/97/bfa58039a44d03e95ed7771fdd8b4af6.jpg",
        type: "T-shirt",
        price: "120000"
    },
    {
        name: "Áo Thun One Piece Luffy Anime Manga Đảo Hải Tặc Tay Lỡ Form Rộng",
        image: "https://hazomi.com/wp-content/uploads/2022/08/231cea030584769e300b4b0d7e873397.jpg",
        type: "T-shirt",
        price: "210000"
    },
    {
        name: "Áo Thun In Hình One Piece Zoro Ngắn Tay 100% Cotton Dành Cho Nam",
        type: "T-shirt",
        image: "https://cf.shopee.vn/file/ab6e16ce31e22b8ebcd60d99daa4c4ad",
        price: "160000"
    },
    {
        name: "Áo Hoodie Naruto Anime Manga Hokage Làng Lá",
        image: "https://lzd-img-global.slatic.net/g/ff/kf/S4e105e7a8afb4bdda5a3769c50361f32S.jpg_720x720q80.jpg",
        type: "Hoodie",
        price: "310000"
    },
    {
        name: "Áo Hoodie Tay Dài In Hình Uchiha Itachi 100% Cotton Dành Cho Nam",
        type: "Hoodie",
        image: "https://cf.shopee.vn/file/sg-11134201-22090-i1rb9b6eithve9",
        price: "260000"
    },
    // Mo hinh mini
    {
        name: "Mô Hình Luffy One Piece Mini Để Bàn Học",
        image: "https://cf.shopee.vn/file/0c7c393e443bc8e4cc15d2d0b00c9577",
        type: "MH_Mini",
        price: "120000"
    },
    {
        name: "Mô Hình Luffy One Piece Mini - Doflamingo ",
        image: "https://salt.tikicdn.com/cache/w400/ts/product/0d/d4/98/3593c64d19f7ff1013fa682c1fb29170.JPG",
        type: "MH_Mini",
        price: "120000"
    },
    {
        name: "Mô Hình Roronoa Zoro Chibi lắc đầu",
        type: "MH_Mini",
        image: "https://salt.tikicdn.com/cache/w400/ts/product/9d/ea/f7/84b9011fab798e71d74d0edb3db5a119.jpg",
        price: "120000"
    },
    // Moc khoa
    {
        name: "Móc khóa mô hình Luffy One Piece Siêu Cute",
        type: "Key",
        image: "https://sg-test-11.slatic.net/p/662efff9420d9b21c4290e98c4803e88.jpg",
        price: "50000"
    },
    {
        name: "Móc khóa mô hình Naruto Mặt Dây Chuyền",
        type: "Key",
        image: "https://lzd-img-global.slatic.net/g/p/a3c1b6590e29c134b05bd4e8037c0710.png_720x720q80.png",
        price: "50000"
    },
    {
        name: "Móc khóa One Piece mũ Luffy Kẽm Hợp Kim.",
        type: "Key",
        image: "https://tabinoshop.com/wp-content/uploads/2020/01/moc-khoa-mu-luffy-one-piece-1.jpg",
        price: "60000"
    },
    
    // Lot chuot
    {
        name: "Lót chuột Naruto 80x30cm giá rẻ dành Cho Sinh Viên",
        type: "Mouse",
        image: "https://cf.shopee.vn/file/f7c4aad4a6b70913996e39f35fbb40f0",
        price: "50000"
    },
    {
        name: "Lót chuột cỡ lớn One Piece Decor Bàn Làm Việc",
        type: "Mouse",
        image: "https://cf.shopee.vn/file/99d2621ff6d3f9cff6df6e38df9eeb06",
        price: "50000"
    },
]

listAccess.forEach(access => AddProduct(access))
PageIndex(1, 8)

function AddProduct(product) {
    let proItem = document.createElement('div')
    proItem.className = 'bg-white shadow-[0_0_15px_#bbb] max-h-[330px] hover:shadow-[0px_0px_10px_#454545] animate-[fadeIn_.5s_linear] duration-300 relative'
    proItem.innerHTML = `
            <div class="w-full max-h-[200px] overflow-hidden">
                <img src="${product.image}" 
                    class="w-full h-full object-cover object-top scale-100 hover:scale-125 duration-500">
            </div>
            <h3 class="mb-4 mt-2 px-2 text-base cursor-pointer line-clamp-2 hover:text-gray-700">${product.name}</h3>
            <h4 class="px-2 pb-3 pt-4 text-[17px] border-t border-[#aaa] font-bold text-[#ff0000]">${FormatPrice(product.price)}₫</h4>
            <i class='bx bxs-plus-circle md:text-[32px] text-[28px] text-green-600 absolute bottom-[10px] right-2 cursor-pointer
             active:text-red-600 add-cart' title="Add To Cart"></i>`
    
    
    document.getElementById('products').appendChild(proItem)
    proItem.querySelector('i').addEventListener('click', AddCartClick)
    proItem.querySelector('h3').addEventListener('click', AddToDetail)
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
