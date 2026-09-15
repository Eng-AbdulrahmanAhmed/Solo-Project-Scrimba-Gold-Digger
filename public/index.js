const investBtn = document.querySelector("#invest-btn");
const closeButton = document.querySelector(".closeBtn");
const dialog = document.querySelector(".outputs");
const summaryPrice = document.querySelector(".total-price");
const value = document.querySelector("#investment-amount");
const createReceiptPdfBtn = document.querySelector('.download-receipt');
const ounceDisplay = document.getElementById("ounce-display");

let goldPrice = 0;
let amount = 0;
let ounce = 0;

function fetchGoldPrice() {
    let textChange;
    fetch('https://api.gold-api.com/price/XAU/USD')
        .then(response => {
            textChange = response.statusText;
            const connectionStatusElement = document.getElementById("connection-status");
            textChange === "OK" ? connectionStatusElement.textContent = "Live Price 🟢" : connectionStatusElement.textContent = "Connection Error 🔴";
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .then(data => {
            goldPrice = data.price;
            const goldPriceElement = document.getElementById('price-display');
            goldPriceElement.textContent = `$${goldPrice.toFixed(4)}`;
        });
}

setInterval(fetchGoldPrice, 3000);

value.addEventListener("input", (e) => {
    e.preventDefault();
    if (value.value > 0) {
        investBtn.disabled = false;
    }
});

investBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.showModal();
    summaryPrice.textContent = `$${value.value}`;

    amount = value.value;
    ounce = (value.value / goldPrice).toFixed(4);

    fetch("/api/invest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: value.value,
            ounce: (value.value / goldPrice).toFixed(4),
            price: goldPrice.toFixed(4)
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
    });
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

value.addEventListener("input", (e) => {
    e.preventDefault();
    ounceDisplay.textContent = (value.value / goldPrice).toFixed(4);
    document.querySelector(".total-price").textContent = `$${value.value}`;
});

createReceiptPdfBtn.addEventListener('click', async () => {
    try {
        console.log(`Amount : ${amount} Ounce: ${ounce}`);
        const response = await fetch(`/api/download-receipt?price=${goldPrice}&amount=${amount}&ounce=${ounce}`, { method: "GET" });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'GoldDigger_Receipt.pdf';
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error downloading receipt:', error);
    }
});
