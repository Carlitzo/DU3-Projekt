async function render_liked(parent) {
    let real_parent = document.getElementById(parent);
    let recipes = await fetch("../../api/recipes.php").then(r => r.json());
    let users = await fetch("../../api/users.php").then(r => r.json());
    let user_id = Number(localStorage.id);
    let liked_recipes = [];
    console.log(users);
    console.log(user_id)
  
    for (let i = 0; i < users.length; i++) {
        if (user_id === users[i].id) {
            liked_recipes = users[i].liked_recipes;
        }
    }

    for(let i = 0; i<recipes.length;i++){
        for(let y= 0; y<liked_recipes.length; y++){
            if (liked_recipes[y] == recipes[i].recipe_id){
                const saved_recipe = document.createElement("div");
                saved_recipe.id = "saved";
                real_parent.appendChild(saved_recipe);
                saved_recipe.innerHTML = `
                <p class="recipe_title" >${recipes[i].name}</p>
                <div class='background_img' class="background" style='background-image: url(${recipes[i].image})' recipe_id= '${recipes[i].recipe_id}'></div>
                <button id="remove">REMOVE</button>`
            }
        }
    }
    

    let image_8 = document.querySelectorAll(".background_img");
    console.log(image_8);
    image_8.forEach(image=>{
        image.addEventListener("click",ingredient_box)

        function ingredient_box(){
            let right_container = document.querySelector("#right")
            right_container.innerHTML= "";
            let recipe_id_image =  image.getAttribute("recipe_id")
            console.log(recipe_id_image);
            for(let s = 0; s<recipes.length;s++){
                if(recipes[s].recipe_id ==recipe_id_image){
                    let ingredients = recipes[s].ingredients;
                        ingredients.forEach(ingredient => {
                            right_container.innerHTML += `<div><input type ='checkbox'><p>${ingredient}</p></div>`;
                            
                        });
                }
            }
        }
    })
}