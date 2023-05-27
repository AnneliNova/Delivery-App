// Отримання елементів DOM
const cartItems = document.getElementById("cartItems");

// Отримання збережених страв з локального сховища
let savedCartItems = localStorage.getItem("cartItems");
let items = [];

if (savedCartItems) {
  items = JSON.parse(savedCartItems);
}

// Відображення страв у кошику
function displayCartItems() {
  cartItems.innerHTML = "";

  items.forEach(meal => {
    const mealItem = document.createElement("li");

    // Додавання зображення страви
    const mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealImage.classList.add("meal-image"); // Додавання класу для зображення страви
    mealItem.appendChild(mealImage);

    // Додавання назви страви
    const mealName = document.createElement("span");
    mealName.textContent = meal.strMeal;
    mealItem.appendChild(mealName);

    // Додавання кнопки "Remove from Cart"
    const removeFromCartButton = document.createElement("button");
    removeFromCartButton.textContent = "Remove from Cart";
    removeFromCartButton.addEventListener("click", () => {
      removeFromCart(meal);
    });
    mealItem.appendChild(removeFromCartButton);

    cartItems.appendChild(mealItem);
  });
}

displayCartItems();

// Функція для додавання страви до кошика
function addToCart(meal) {
  // Додавання страви до списку
  items.push(meal);

  // Оновлення локального сховища
  localStorage.setItem("cartItems", JSON.stringify(items));

  // Оновлення відображення кошика
  displayCartItems();

  console.log(`Added to cart: ${meal.strMeal}`);
}

// Функція для видалення страви з кошика
function removeFromCart(meal) {
  // Видалення страви зі списку
  items = items.filter(item => item.idMeal !== meal.idMeal);

  // Оновлення локального сховища
  localStorage.setItem("cartItems", JSON.stringify(items));

  // Оновлення відображення кошика
  displayCartItems();

  console.log(`Removed from cart: ${meal.strMeal}`);
}

// Отримання елементу кнопки "Надіслати"
const submitButton = document.getElementById("submitOrder");

// Додавання обробника події для кнопки "Надіслати"
submitButton.addEventListener("click", () => {
  // Отримання даних з форми замовлення
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const orderItems = localStorage.getItem("cartItems");

  // Створення об'єкта замовлення
  const order = {
    name: name,
    email: email,
    phone: phone,
    address: address,
    items: orderItems
  };

  // Відправлення замовлення до сервера або збереження в базі даних
  saveOrder(order);
});

// Функція для збереження замовлення
function saveOrder(order) {
  console.log("Order:", order);
}
