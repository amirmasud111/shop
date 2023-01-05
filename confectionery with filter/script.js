let filters = document.querySelectorAll(".filter");
let input = document.querySelector(".input-text");
let cardContainer = document.querySelector(".cards-container");
let modalIcons = document.querySelectorAll(".modal i");
let modalImage = document.querySelector(".modal img");
let modalContainer = document.querySelector(".modal-container");
let navbarIcon = document.querySelector("#bars");
let showTotalCart = document.querySelector(".total-cart");
let purchaseList = document.querySelector(".purchases")
let totalItemsNumber = document.querySelector('.total-items-number');
let totalPriceNav = document.querySelector(".total-price-nav");
let totalPriceCartList = document.querySelector("#total-price-number");



let cartlist = JSON.parse(localStorage.getItem("cartList")) || [];
let totalCartPrice = [];
let data = [
    { image: "./img/cake-1.jpeg", title: "Cake 1", price: "$5", type: "cake", code: 1 },
    { image: "./img/cake-2.jpeg", title: "Cake 2", price: "$5", type: "cake", code: 2 },
    { image: "./img/cupcake-1.jpeg", title: "Cupcake 1", price: "$2", type: "cupcake", code: 3 },
    { image: "./img/cupcake-2.jpeg", title: "Cupcake 2", price: "$2", type: "cupcake", code: 4 },
    { image: "./img/doughnut-1.jpeg", title: "Doughnut 1", price: "$3", type: "doughnut", code: 5 },
    { image: "./img/doughnut-2.jpeg", title: "Doughnut 2", price: "$3", type: "doughnut", code: 6 },
]

class Card {
    constructor(image, title, price, type, code) {
        this.image = image;
        this.title = title;
        this.price = price;
        this.type = type;
        this.code = code;
    }
    createCard() {
        let gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.setAttribute("code", this.code);
        let img = document.createElement("img");
        img.classList.add("image");
        img.src = this.image;
        let icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-shopping-cart");
        let info = document.createElement("div");
        info.classList.add("info");
        let title = document.createElement("div");
        title.classList.add("name");
        title.innerHTML = this.title;
        let price = document.createElement("div");
        price.classList.add("price");
        price.innerHTML = this.price;

        info.appendChild(title);
        info.appendChild(price);
        gridItem.appendChild(img);
        gridItem.appendChild(icon);
        gridItem.appendChild(info);
        gridItem.classList.add(this.type);

        cardContainer.appendChild(gridItem);

    }
}


data.forEach(element => {
    let card = new Card(element.image, element.title, element.price, element.type, element.code);

    card.createCard();
})

let cards = Array.from(cardContainer.children);

filters.forEach(filter => {
    filter.addEventListener("click", e => {
        cards.forEach(card => {
            card.style.display = "flex";
            card.classList.remove("filtered");
        })
        if (filter.classList.contains("all")) {
            cards.forEach(card => {
                card.style.display = "flex";
            })
        }
        filtering(filter, "sweet")
        filtering(filter, "cake")
        filtering(filter, "cupcake")
        filtering(filter, "doughnut")
        filtering(filter, "sweet");
    })
})

input.addEventListener("input", (e) => {
    cards.forEach(card => {

        if (!card.lastChild.firstChild.innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
            card.style.display = "none";
        } else if (card.classList.contains("filtered")) {
            card.style.display = "flex";
        }
    })
})

let images = document.querySelectorAll(".image");
let imagesArray = Array.from(images);

images.forEach(image => {
    image.addEventListener("click", () => {
        modalContainer.style.display = "flex";
        modalImage.src = image.src;
    })
})


modalIcons.forEach(icon => {
    icon.addEventListener("click", e => {
        let index = imagesArray.findIndex(image => image.src == modalImage.src);
        if (e.target.id == "close-icon") {
            modalContainer.style.display = "none";
        } else if (e.target.id == "pre-btn") {
            index = index == 0 ? imagesArray.length - 1 : index;
            modalImage.src = imagesArray[index - 1].src;
        } else {
            index = index == imagesArray.length - 1 ? 0 : index;
            modalImage.src = imagesArray[index + 1].src;
        }
    })

})

navbarIcon.addEventListener("click", e => {
    document.querySelector("nav").classList.toggle("show-nav");
    console.log(navbarIcon)
})

window.addEventListener("click", e => {
    if (e.target == modalContainer) {
        modalContainer.style.display = "none";
    }
})


purchaseList.addEventListener("click", e => {
    if (e.target.nodeName == "I") {
        let index = Array.from(cardContainer.children).findIndex(element => element = e.target.parentNode);
        totalCartPrice.splice(index, 1);
        cartlist.splice(index, 1);
        localStorage.setItem("cartList", JSON.stringify(cartlist));
        totalItemsNumber.innerHTML = totalCartPrice.length;
        totalPriceCartList.innerHTML = totalPriceNav.innerHTML = totalCartPrice.reduce((a, b) => a + b, 0);
        e.target.parentNode.remove();
    }
})

cardContainer.addEventListener("click", e => {
    if (e.target.classList.contains("fa-shopping-cart")) {
        let purchaseInfo = data.find(element => element.code == e.target.parentNode.getAttribute("code"));
        cartlist.push(purchaseInfo);
        localStorage.setItem("cartList", JSON.stringify(cartlist));
        createCartList(cartlist);
    }
})

if (cartlist.length != 0) {
    createCartList(cartlist)
}


function createCartList(cartlist) {
    purchaseList.innerHTML = "";
    totalCartPrice = [];
    cartlist.forEach(element => {
        purchaseList.appendChild(createPurchaseListItem(element));
        totalCartPrice.push(element.price.substring(1) * 1);
    })
    totalItemsNumber.innerHTML = totalCartPrice.length;
    totalPriceCartList.innerHTML = totalPriceNav.innerHTML = totalCartPrice.reduce((a, b) => a + b, 0);
}

function createPurchaseListItem(itemInfo) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    let cartInfo = document.createElement("div");
    let cartItem = document.createElement("div");
    let dollar = document.createElement("span");
    let cartPrice = document.createElement("div");
    let icon = document.createElement("i");

    cartInfo.classList.add("cart-info");
    cartItem.classList.add("cart-item");
    cartPrice.classList.add("cart-price");
    icon.classList.add("fa", "fa-trash");

    img.src = itemInfo.image;
    cartItem.innerHTML = itemInfo.title;
    cartPrice.innerHTML = itemInfo.price.substring(1);
    dollar.innerHTML = " $";

    li.appendChild(img);
    cartPrice.appendChild(dollar);
    cartInfo.appendChild(cartItem);
    cartInfo.appendChild(cartPrice);
    li.appendChild(cartInfo);
    li.appendChild(icon);

    return li
}

function filtering(filter, type) {
    if (filter.classList.contains(type)) {
        cards.forEach(card => {
            if (!card.classList.contains(type)) {
                card.style.display = "none";
                card.classList.remove("filtered");
            } else {
                card.classList.add("filtered");
            }
        })
    }
}

function showTotalPurchases() {
    showTotalCart.classList.toggle("show-total-cart")
}








