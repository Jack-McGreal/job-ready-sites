function Site(name, address, trade, status) {
    this.name = name;
    this.address = address;
    this.trade = trade;
    this.status = status;
    this.id = crypto.randomUUID();
}

let mySites = [];


function addSiteToSites(name, address, trade, status) {
    const newSite = new Site(name, address, trade, status);
    mySites.push(newSite);
}

Site.prototype.changeStatus = function () {
    if (this.status === "Ready") {
        this.status = "Not Ready";
    }
    else if (this.status === "Not Ready") {
        this.status = "In Progress";
    }
    else { 
        this.status = "Ready";
    }
};

addSiteToSites(
  "West End Apartments",
  "12 Boundary Street",
  "Carpentry",
  "Not Ready"
);

console.log(mySites);

const siteContainer = document.getElementById("site-container");
function displaySites() {
    siteContainer.innerHTML = "";
    mySites.forEach((site)=> {
        const siteDiv = document.createElement("div");      
        siteDiv.dataset.id = site.id;
        siteDiv.classList.add("site");
        siteContainer.appendChild(siteDiv);
        const siteName = document.createElement("h2");
        siteName.textContent = site.name;
        siteDiv.appendChild(siteName);
        const siteAddress = document.createElement("p");
        siteAddress.textContent = "Address: " + site.address;
        siteDiv.appendChild(siteAddress);
        const siteTrade = document.createElement("p");
        siteTrade.textContent = "Trade: " + site.trade;
        siteDiv.appendChild(siteTrade);
        const siteStatus = document.createElement("p");
        siteStatus.textContent = "Status: " + site.status;
        siteStatus.classList.add("status");
        siteDiv.appendChild(siteStatus);
        const removeButton = document.createElement("button");  
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            mySites = mySites.filter((item) => {
                return item.id !== site.id;
            });
            displaySites();
        });
        const statusButton = document.createElement("button");
        statusButton.textContent = "Change Status";
        statusButton.addEventListener("click", () => {
            site.changeStatus();
            displaySites();
        });
        siteDiv.appendChild(statusButton);
        siteDiv.appendChild(removeButton);
    });
}


const siteForm = document.getElementById("site-form");
siteForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const siteName = document.getElementById("site-name").value;
    const siteAddress = document.getElementById("site-address").value;
    const siteTrade = document.getElementById("site-trade").value;
    const siteStatus = document.getElementById("site-status").value;

    addSiteToSites(siteName, siteAddress, siteTrade, siteStatus);
    displaySites();
    siteForm.reset();
});

displaySites();
