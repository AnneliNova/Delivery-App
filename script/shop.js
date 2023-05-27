// Отримання списку категорій з API
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => response.json())
  .then(data => {
    const categories = data.categories;

    // Отримання елементів DOM
    const cartItems = document.getElementById("cartItems");

    // Генерування списку страв для вибраної категорії
    function generateMealList(category) {
      // Очищення списку страв перед відображенням нових
      cartItems.innerHTML = "";

      // Отримання страв за категорією з API
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
        .then(response => response.json())
        .then(data => {
          const meals = data.meals;

          // Генерування списку страв
          meals.forEach(meal => {
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

            // Додавання кнопки "Add to Cart"
            const addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.addEventListener("click", () => {
              // Додати страву до кошика
              addToCart(meal);
            });
            mealItem.appendChild(addToCartButton);

            cartItems.appendChild(mealItem);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    // Вішаємо подію на категорії для відображення страв
    categories.forEach(category => {
      const categoryName = category.strCategory;
      const categoryNameLink = document.createElement("a");
      categoryNameLink.textContent = categoryName;
      categoryNameLink.href = "#";
      categoryNameLink.addEventListener("click", () => {
        generateMealList(category);
      });

      const categoryElement = document.createElement("div");
      categoryElement.classList.add("category");
      categoryElement.appendChild(categoryNameLink);

      const categoriesContainer = document.querySelector(".categories");
      categoriesContainer.appendChild(categoryElement);
    });

    // Функція для додавання страви до кошика
    function addToCart(meal) {
      // Отримання збережених страв з локального сховища
      let savedCartItems = localStorage.getItem("cartItems");
      let items = [];

      if (savedCartItems) {
        items = JSON.parse(savedCartItems);
      }

      // Додавання страви до списку
      items.push(meal);

      // Оновлення локального сховища
      localStorage.setItem("cartItems", JSON.stringify(items));

      console.log(`Added to cart: ${meal.strMeal}`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
