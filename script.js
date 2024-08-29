document.addEventListener("DOMContentLoaded", () => {
    const enrollButtons = document.querySelectorAll(".enroll-btn");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    enrollButtons.forEach(button => {
        button.addEventListener("click", () => {
            const courseCard = button.closest(".card");
            const courseTitle = courseCard.querySelector(".card-title").innerText;
            const coursePrice = parseFloat(courseCard.querySelector(".card-price").innerText.replace('$', ''));
            let existingItem = null;
            const items = cartItems.querySelectorAll("li");
            items.forEach(item => {
                if (item.dataset.title === courseTitle) {
                    existingItem = item;
                }
            });
            if (existingItem) {
                const quantitySpan = existingItem.querySelector(".quantity");
                const quantity = parseInt(quantitySpan.innerText, 10) + 1;
                quantitySpan.innerText = quantity;
                const itemPriceSpan = existingItem.querySelector(".item-price");
                itemPriceSpan.innerText = `$${(coursePrice * quantity).toFixed(2)}`;
            } else {
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item");
                listItem.dataset.title = courseTitle;
                listItem.innerHTML = `
                    <p class="d-inline">${courseTitle} - $<span class="item-price">${coursePrice.toFixed(2)}</span></p>
                    <span class="btns">
                        <button class="decrease-btn btn btn-outline-success">-</button>
                        <span class="quantity">1</span>
                        <button class="increase-btn btn btn-outline-success">+</button>
                    </span>
                `;
                cartItems.appendChild(listItem);
                listItem.querySelector(".decrease-btn").addEventListener("click", () => {
                    const quantitySpan = listItem.querySelector(".quantity");
                    let quantity = parseInt(quantitySpan.innerText, 10) - 1;
                    if (quantity <= 0) {
                        cartItems.removeChild(listItem);
                    } else {
                        quantitySpan.innerText = quantity;
                        const itemPriceSpan = listItem.querySelector(".item-price");
                        itemPriceSpan.innerText = `$${(coursePrice * quantity).toFixed(2)}`;
                    }
                    const currentCount = parseInt(cartCount.innerText, 10);
                    cartCount.innerText = currentCount - 1;
                });
                listItem.querySelector(".increase-btn").addEventListener("click", () => {
                    const quantitySpan = listItem.querySelector(".quantity");
                    const quantity = parseInt(quantitySpan.innerText, 10) + 1;
                    quantitySpan.innerText = quantity;
                    
                    const itemPriceSpan = listItem.querySelector(".item-price");
                    itemPriceSpan.innerText = `$${(coursePrice * quantity).toFixed(2)}`;
                    const currentCount = parseInt(cartCount.innerText, 10);
                    cartCount.innerText = currentCount + 1;
                });
            }
            const currentCount = parseInt(cartCount.innerText, 10);
            cartCount.innerText = currentCount + 1;
        });
    });
});
