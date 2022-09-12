const laptops = [];
let selectedLaptop;

document.getElementById("laptopInfo").style.display = "none";

const btnBuyNow = document.getElementById("btn-buyLaptop");
btnBuyNow.addEventListener("click", buttonBuyNow);

// Handlers
function buttonBuyNow() {
    buyNow();
}

// Functions
function buyNow() {
    if (bankAccount + currentLoan < selectedLaptop.price) {
        alert("You cannot afford this item!");
    } else {
        bankAccount -= selectedLaptop.price;
        bankAccountFormatted = new Intl.NumberFormat('no-NB', { style: 'currency', currency: 'NOK' }).format(bankAccount);
        bankAccountText.innerText = `Bank balance ${bankAccountFormatted}`;
        alert(`Congratulations, you are now the proud owner of a ${selectedLaptop.title}!`);
    }
}

function UrlExists(url) { // Helper function to see if an image exists for a laptop
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404)
        return true;
    else
        return false;
}

// Module Pattern & IIFEs

async function fetchLaptops() {
    try {
        const response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers");
        const jsonLaptops = await response.json();
        return jsonLaptops;
    }
    catch (error){
        console.error("Error: ", error.message);
    }
}

(async () => {
    // DOM Elements
    const laptopsSelectElement = document.getElementById("laptops");
    const laptopTitleElement = document.getElementById("laptop-title");
    const laptopDescriptionElement = document.getElementById("laptop-description");
    const laptopSpecsElement = document.getElementById("laptop-specs");
    const laptopPriceElement = document.getElementById("laptop-price");
    const laptopImageElement = document.getElementById("laptop-image");
    // const laptopActiveElement = document.getElementById("laptop-active");
    // const laptopStockElement = document.getElementById("laptop-stock");

    // Variables
    const laptops = await fetchLaptops();

    // Functions
    
    for (const laptop of laptops) {
        laptopsSelectElement.innerHTML += `<option value="${laptop.id}">${laptop.title}</option>`;
    }

    const renderLaptopSpecs = (selectedLaptop) => {
        
        laptopSpecsElement.innerHTML = "";
        for(const key in selectedLaptop.specs) {
            const spec = selectedLaptop.specs[key];
            laptopSpecsElement.innerHTML += `<li>${spec}</li>`;
        }
    }
    
    const renderLaptopInfo = (selectedLaptop) => {
        console.log(selectedLaptop.image);
        if(UrlExists("https://noroff-komputer-store-api.herokuapp.com/" + selectedLaptop.image)) {
            laptopImageElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedLaptop.image;
        } else {
            laptopImageElement.src = "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
        }
        laptopTitleElement.innerText = selectedLaptop.title;
        laptopDescriptionElement.innerText = selectedLaptop.description;
        laptopPriceElement.innerText = selectedLaptop.price + " NOK";
        // laptopStockElement.innerText = selectedLaptop.stock;
        // laptopActiveElement.innerText = selectedLaptop.active;
    }

    function onSelectChange() {
        const laptopId = this.value;
        selectedLaptop = laptops.find(l => l.id == laptopId);
        renderLaptopSpecs(selectedLaptop);
        renderLaptopInfo(selectedLaptop);
        document.getElementById("laptopInfo").style.display = "block";
    }

    laptopsSelectElement.addEventListener("change", onSelectChange);
})();