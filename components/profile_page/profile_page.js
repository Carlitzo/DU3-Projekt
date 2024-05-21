function render_profile_page() {
    document.querySelector("#wrapper").innerHTML = "";

    render_header(document.querySelector("#wrapper"));

    const profile_wrapper = document.createElement("div");
    profile_wrapper.id = "profile_wrapper";
    wrapper.appendChild(profile_wrapper);

    const liked_wrapper = document.createElement("div");
    liked_wrapper.id = "liked_wrapper";
    profile_wrapper.appendChild(liked_wrapper);

    const list_wrapper = document.createElement("div");
    list_wrapper.id = "list_wrapper";
    profile_wrapper.appendChild(list_wrapper);

    liked_wrapper.innerHTML = `
    <p>Saved recipes</p>
    <div id="left"></div>`

    list_wrapper.innerHTML = `
    <p>Shopping list</p>
    <div id="right"></div>`

    let database = fetch("../../api/recipes.php").then(r => r.json());
    let user_id = localStorage.id;
    let liked_recipes = [];
    for (let i = 0; i < database.USERS.length; i++) {
        if (user_id === database.USERS[i].id) {
            liked_recipes = database.USERS[i].liked_recipes;
        }
    }
    for (let i = 0; i < liked_recipes.length; i++) {
        for (let y = 0; y < database.RECIPES.length; y++) {
            if (liked_recipes[i] === database.RECIPES[y].recipe_id) {
                const saved_recipe = document.createElement("div");
                document.getElementById("left").append(saved_recipe);
                let recipe_name = database.RECIPES[y].name
                let recipe_img = databasea.RECIPES[y].image
                saved_recipe.innerHTML = `
                <p class = 'recipe_name'>${recipe_name}</p>
                <div class='background_img' style='background-image: url(${recipe_img})'></div>
                <button id="remove">REMOVE</button>
                `

            }
        }
    }


}
