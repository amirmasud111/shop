let filters = document.querySelectorAll(".filter");
let input = document.querySelector(".input-text");
let cardContainer = document.querySelector(".cards-container");


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
        })
        if (filter.classList.contains("all")) {
            cards.forEach(card => {
                card.style.display = "flex";
            })
        } else if (filter.classList.contains("cake")) {
            cards.forEach(card => {
                if (!card.classList.contains("cake")) {
                    card.style.display = "none";
                }
            })

        } else if (filter.classList.contains("cupcake")) {
            cards.forEach(card => {
                if (!card.classList.contains("cupcake")) {
                    card.style.display = "none";
                }
            })

        } else if (filter.classList.contains("doughnut")) {
            cards.forEach(card => {
                if (!card.classList.contains("doughnut")) {
                    card.style.display = "none";
                }
            })

        } else if (filter.classList.contains("sweet")) {
            cards.forEach(card => {
                if (!card.classList.contains("sweet")) {
                    card.style.display = "none";
                }
            })

        }


    })
})


