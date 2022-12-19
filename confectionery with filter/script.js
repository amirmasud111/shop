let filters = document.querySelectorAll(".filter");
let input = document.querySelector(".input-text");
let cardContainer = document.querySelector(".cards-container");
let modalIcons = document.querySelectorAll(".modal i");
let modalImage = document.querySelector(".modal img");
let modalContainer = document.querySelector(".modal-container");
let navbarIcon = document.querySelector(".image-navbar-icon i");




let data = [
    { image: "./img/cake-1.jpeg", title: "Cake 1", price: "$5", type: "cake" },
    { image: "./img/cake-2.jpeg", title: "Cake 2", price: "$5", type: "cake" },
    { image: "./img/cupcake-1.jpeg", title: "Cupcake 1", price: "$2", type: "cupcake" },
    { image: "./img/cupcake-2.jpeg", title: "Cupcake 2", price: "$2", type: "cupcake" },
    { image: "./img/doughnut-1.jpeg", title: "Doughnut 1", price: "$3", type: "doughnut" },
    { image: "./img/doughnut-2.jpeg", title: "Doughnut 2", price: "$3", type: "doughnut" },
]

class Card {
    constructor(image, title, price, type) {
        this.image = image;
        this.title = title;
        this.price = price;
        this.type = type;
    }
    createCard() {
        let gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
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
    let card = new Card(element.image, element.title, element.price, element.type);

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
})

window.addEventListener("click", e => {
    if (e.target == modalContainer) {
        modalContainer.style.display = "none";
    }
})


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







