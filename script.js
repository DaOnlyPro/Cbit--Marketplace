// Dummy data for listings
const listingsData = [
    { name: "Textbook", description: "Introduction to Computer Science", price: 30, image: "textbook.jpg" },
    { name: "Laptop", description: "MacBook Pro 13-inch", price: 600, image: "laptop.jpg" },
    { name: "Chair", description: "Office Chair", price: 50, image: "chair.jpg" }
];

// Function to display listings
function displayListings() {
    const listingsContainer = document.getElementById("listings");
    listingsContainer.innerHTML = '';
    listingsData.forEach(listing => {
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing");
        listingElement.innerHTML = `
            <img src="${listing.image}" alt="${listing.name}">
            <h3>${listing.name}</h3>
            <p>${listing.description}</p>
            <p>$${listing.price}</p>
            <button class="buyButton">Buy</button>
        `;
        listingsContainer.appendChild(listingElement);
    });
}

// Event listener for selling item button
document.getElementById("sellButton").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
});

// Event listener for closing modal
document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});

// Event listener for submitting sell form
document.getElementById("sellForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const itemName = document.getElementById("itemName").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const itemPrice = document.getElementById("itemPrice").value;
    // You can handle image upload here
    // Add the new listing to listingsData
    listingsData.push({ name: itemName, description: itemDescription, price: itemPrice, image: "placeholder.jpg" });
    displayListings(); // Refresh listings
    document.getElementById("modal").style.display = "none"; // Close modal
});

// Display initial listings
displayListings();
// Function to handle signup
function signup(username, email, password) {
    // Implement signup functionality here (e.g., send data to backend)
    console.log("Signup:", username, email, password);
}

// Function to handle signin
function signin(username, password) {
    // Implement signin functionality here (e.g., verify credentials with backend)
    console.log("Signin:", username, password);
}

// Event listener for signup form submission
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signup(username, email, password);
    // Redirect to homepage or signin page
});

// Event listener for signin form submission
document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    signin(username, password);
    // Redirect to homepage or dashboard
});
