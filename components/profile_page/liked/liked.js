async function render_liked(parent) {
    let real_parent = document.getElementById(parent);
    let recipes = await fetch("../../api/recipes.php").then(r => r.json());
    let users = await fetch("../../api/users.php").then(r => r.json());
    let user_id = Number(localStorage.id);
    let liked_recipes = [];

    for (let i = 0; i < users.length; i++) {
        if (user_id === users[i].id) {
            liked_recipes = users[i].liked_recipes;
        }
    }

    for (let i = 0; i < recipes.length; i++) {
        for (let y = 0; y < liked_recipes.length; y++) {
            if (liked_recipes[y] == recipes[i].recipe_id) {
                const saved_recipe = document.createElement("div");
                saved_recipe.id = "saved";
                real_parent.appendChild(saved_recipe);
                saved_recipe.innerHTML = `
                <p class="recipe_title" >${recipes[i].name}</p>
                <div class="img_container">
                <div  class="background" style='background-image: url(${recipes[i].image})' recipe_id= '${recipes[i].recipe_id}'></div>
                </div>
                <p class="remove">REMOVE</p>`
            }
        }
    }

    let selected_image = document.querySelectorAll(".background");
    selected_image.forEach(image => {
        image.addEventListener("click", ingredient_box)

        function ingredient_box() {
            let right_container = document.querySelector("#right")
            right_container.innerHTML = "";
            let recipe_id_image = image.getAttribute("recipe_id");

            for (let s = 0; s < recipes.length; s++) {
                if (recipes[s].recipe_id == recipe_id_image) {
                    let ingredients = recipes[s].ingredients;
                    ingredients.forEach(ingredient => {
                        right_container.innerHTML += `<div class="ing_list"><p>•</p><p>${ingredient}</p></div>`;
                    });
                }
            }
        }
    })
}