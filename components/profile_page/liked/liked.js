async function render_liked(parent) {
    let real_parent = document.getElementById(parent);
    let recipes = await fetch("../../api/recipes.php").then(r => r.json());
    let users = await fetch("../../api/users.php").then(r => r.json());
    let user_id = Number(localStorage.id);
    let liked_recipes = [];
    console.log(users);
    console.log(user_id)
    console.log("you made it to 1st")
    for (let i = 0; i < users.length; i++) {
        if (user_id === users[i].id) {
            console.log("you made it inside the if")
            liked_recipes = users[i].liked_recipes;
        }
    }
    console.log("you made it to 2nd")
    for (let i = 0; i < liked_recipes.length; i++) {
        for (let y = 0; y < recipes.length; y++) {
            console.log("you made it to 3rd")
            if (liked_recipes[i] === recipes[y].recipe_id) {
                const saved_recipe = document.createElement("div");
                saved_recipe.id = "saved";
                real_parent.appendChild(saved_recipe);
                let recipe_name = recipes[y].name
                let recipe_img = recipes[y].image
                saved_recipe.innerHTML = `
                <p class="recipe_title" >${recipe_name}</p>
                <div class="img_container">
                    <div class="background" style='background-image: url(${recipe_img})'></div>
                </div>
                <p class="remove">REMOVE</p> 
                `
            }
        }
    }
}