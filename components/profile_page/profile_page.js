async function render_profile_page() {
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

    let recipes = await fetch("../../api/recipes.php").then(r => r.json());
    let users = await fetch("../../api/users.php").then(r => r.json());
    let user_id = localStorage.id;
    let liked_recipes = [];
    for (let i = 0; i < users.length; i++) {
        if (user_id === users[i].id) {
            liked_recipes = users[i].liked_recipes;
        }
    }
    for (let i = 0; i < liked_recipes.length; i++) {
        for (let y = 0; y < recipes.length; y++) {
            if (liked_recipes[i] === recipes[y].recipe_id) {
                const saved_recipe = document.createElement("div");
                document.getElementById("left").append(saved_recipe);
                let recipe_name = recipes[y].name
                let recipe_img = recipes[y].image
                saved_recipe.innerHTML = `
                <p class = 'recipe_name'>${recipe_name}</p>
                <div class='background_img' style='background-image: url(${recipe_img})'></div>
                <button id="remove">REMOVE</button>
                `

            }
        }
    }


}
