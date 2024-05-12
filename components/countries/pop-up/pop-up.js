
                
async function render_popup(recipes_images){
    recipes_images.forEach(recipe_image =>{
         recipe_image.addEventListener("click", async() =>{

            const recipe_name_popup =  recipe_image.getAttribute("name");

            document.querySelector("body").style.backgroundColor = "#152028"
            document.getElementById("wrapper").style.display = "block";
            wrapper.innerHTML = "";

            try{
                const response = await fetch("../api/database.json");
                const data = await response.json();
                const recipe_content_popup = data.RECIPES.find(recipe => recipe.name === recipe_name_popup);

            wrapper.innerHTML =`
            <div class='icons_options'>
                <div class='save_icon'><i class="fa-regular fa-bookmark"></i></div>
                <div class='cancel-icon'><i class="fa-solid fa-x"></i></div>
            </div>

            <p class = 'recipe_name_popup'>${recipe_content_popup.name}</p>

            <div class='info_side_popup'>
                <div class='around_img_popup'>
                    <div class='background_img_popup' style='background-image: url(${recipe_content_popup.image})'></div>
                </div>
                <div class='recipe_info_popup'>
                    <p class='recipe_description_popup'>${recipe_content_popup.description}</p>
                    <p class='recipe_preparation_time_popup'>prep-time: ${recipe_content_popup.preparation_time}</p>
                </div>
            </div>
                        
            <div class='ingredients_section'>
                <div class='ingredients_title'>
                    <p>INGREDIENTS</p>
                </div>
            </div>
                        
            <div class='instructions_section'>
                <p>INSTRUCTIONS</P>
            </div>`;

            let ingredient_ul = document.createElement("ul");
            ingredient_ul.classList.add("ingredients_list")
            document.querySelector(".ingredients_section").appendChild(ingredient_ul)

            recipe_content_popup.ingredients.forEach(ingredient => {
                    const ingredient_line = document.createElement("div"); 
                ingredient_line.innerHTML = `
                <p>•</p>
                <p>${ingredient}</p>`

                ingredient_ul.append(ingredient_line)
            });

            let instruction_ul = document.createElement("ul");
            instruction_ul.classList.add("instructions_list")
            document.querySelector(".instructions_section").appendChild(instruction_ul)
                        
                        

            recipe_content_popup.steps.forEach(step => {
                const step_line = document.createElement("div"); 
                step_line.innerHTML = `
                <p>•</p>
                <p>${step}</p>`

                instruction_ul.append(step_line)
            });
            
            }catch(error){
                console.error('Error fetching data:', error);
            } 
        })
    })
}