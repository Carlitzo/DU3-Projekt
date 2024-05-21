function render_profile_page() {
    document.querySelector("#wrapper").innerHTML = "";

    let database = fetch("../../api/recipes.php").then(r => r.json());
    let user_id = localStorage.user.id;
    for (let i = 0; i < database.USERS.length; i++) {
        if (user_id === database.USERS[i].id) {
            let liked_recipes = database.USERS[i].liked_recipes;
        }
    }
    for (let i = 0; i < liked_recipes.length; i++) {
        for (let y = 0; y < database.RECIPES.length; y++) {
            if (liked_recipes[i] === database.RECIPES[y].recipe_id) {
                //render recipe on page
            }
        }
    }

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
    <p>Saved recipes</p>`

    list_wrapper.innerHTML = `
    <p>Shopping list</p>`


}
