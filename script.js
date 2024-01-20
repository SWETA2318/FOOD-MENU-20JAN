const foodItems = document.getElementById("food_items");
let foodData = [];


// getMenu function
function getMenu() {
    return fetch(
        "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    )
    .then((response)  => response.json())
    .then((data) => {
        foodData = data;
        showMenu(foodData);
    })
    .catch((e) => console.log(e));
}

//showMenu function to map the foodData on HTML page,

function showMenu(data) {
    foodData = data;
    foodData.map((item)  => {
        foodItems.innerHTML += `
        <div id="${item.id}" class="food_card">
        <img src="${item.imgsrc}" alt="${item.name}">
        <div class="card_text">
        <div>
        <h3>${item.name}</h3>
        <p>$${item.price}/-</p>
        </div>
        <div>
        <i class="fa-solid fa-square-plus"</i>
        </div>
        </div>
        </div>
        `;
    });
    }

    //takeorder function to take the orders.
    function takeOrder() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomBurgers =[];
                for (let i = 0; i < 3; i++) {
                    const randomIndex = Math.floor(Math.random() * foodData.length);
                    randomBurgers.push(foodData[randomIndex]);
                }
                const order = { burgers: randomBurgers };
                resolve(order);
            }, 2500);
            });
        }

//orderprep function to prep the order.
        function orderPrep() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const orderStatus = { order_status: true, paid: false };
                    resolve(orderStatus);
                }, 1500);
                });
            }

//payorder function to make payment.
function payorder(orderStatus) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
       orderStatus = { ...orderStatus, paid: true };
       resolve(orderStatus);
        }, 1000);
    });
    }
//function to display thank you message when order confirmed.
            function thankYouFnc() {
                alert("Thank you for eating with us today!");
              }


              //chain promises to handle the entire process.
              getMenu()
              .then(()  => thankOrder())
              .then((order) => orderPrep(order))
              .then((orderStatus) => payOrder(orderStatus))
              .then((orderStatus) => {
                if (orderStatus.paid) {
                    thankYouFnc();
                }
              })
              .catch((err) => console.log(err));
        