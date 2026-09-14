let goldPrice = 0;
function fetchGoldPrice() {
    let textChange ;
    fetch('https://api.gold-api.com/price/XAU/USD')
        .then(response => {
            textChange = response.statusText
            const connectionStatusElement = document.getElementById("connection-status")
            textChange === "OK" ? connectionStatusElement.textContent = "Live Price 🟢" : connectionStatusElement.textContent = "Connection Error 🔴"
            return response.json()
        })
        .then(data => {
            console.log(data)
            return data
        })
        .then(data => {
            goldPrice = data.price;
            const goldPriceElement = document.getElementById('price-display')
            goldPriceElement.textContent = `$${goldPrice.toFixed(4)}`
        });
}

setInterval(fetchGoldPrice, 3000)

const investBtn = document.querySelector("#invest-btn");
const closeButton = document.querySelector(".closeBtn");
const dialog = document.querySelector(".outputs");
const summaryPrice = document.querySelector(".total-price");
const value = document.querySelector("#investment-amount");
// investBtn.addEventListener("click", () => dialog.showModal());
value.addEventListener("input", (e) => {
    e.preventDefault();
    
    if (value.value > 0) {
        investBtn.disabled = false;
    }
})
investBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.showModal();
    summaryPrice.textContent = `$${value.value}`;
    fetch("/api/invest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: value.value }) 
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
    })
   
})


closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});
// fetching total once price of gold based on the amount entered by the user
const ounceDisplay = document.getElementById("ounce-display");
value.addEventListener("input", (e) => {
    e.preventDefault();
    ounceDisplay.textContent = (value.value / goldPrice).toFixed(4);
    document.querySelector(".total-price").textContent = `$${value.value}`;
    
})
