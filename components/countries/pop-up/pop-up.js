
fetch("../../api/users.php").then(r => r.json()).then(console.log);
async function goBack(country_name, country_id) {

    let countryName = country_name;
    let countryId = country_id;

    wrapper.style.display = "grid";
    wrapper.style.bottom = "0px";
    wrapper.innerHTML = "";

    render_nav(wrapper);
    render_footer(wrapper);
    render_header(wrapper);

    const header_1 = document.querySelector("#header");
    header_1.innerHTML += `<p class='selected_country'>${countryName.toUpperCase()}</p>`

    try {
        const response = await fetch("../../api/countries.php"); // Ska fetcha från PHP filen och inte JSON filen!
        const data = await response.json();
        console.log("HERE I AM");
        console.log(data);
        
        const countryData = data.COUNTRIES.find(country => country.country_name === countryName);
        const countryRecipes = data.RECIPES.filter(recipe => recipe.country_id === parseInt(countryId));

        let div_1 = document.createElement("div");
        div_1.classList.add("choosen_country");

        console.log(countryData);


        div_1.innerHTML = `<img class='country_img' src= ${countryData.country_image}>
                <p class='introductory_text'>${countryData.introductory_text}</p>
                <div id='recipes_section'></div>`

        wrapper.appendChild(div_1);

        const div_recipes = document.querySelector("#recipes_section");
        div_recipes.innerHTML = `<p id ='explore'>Explore our recipes</p>
                <div class ='recipe_content'></div>`

        countryRecipes.forEach(recipe => {

            document.querySelector(".recipe_content").innerHTML +=
                `  <p class = 'recipe_name'>${recipe.name}</p>

                        <div class='info_side'>
                            <div class='around_img' name='${recipe.name}'>
                                <div class='background_img' style='background-image: url(${recipe.image})'></div>
                            </div>
                                
                            <div class='recipe_info'>
                                <p class='recipe_description'>${recipe.description}</p>
                                <p class='recipe_preparation_time'>prep-time: ${recipe.preparation_time}</p>
                            </div>
                        </div>`

        });
        const recipes_images = document.querySelectorAll(".around_img");
        render_popup(recipes_images)

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}                

async function render_popup(recipes_images){
    
    recipes_images.forEach(recipe_image =>{
         recipe_image.addEventListener("click", async() =>{

            const recipe_name_popup =  recipe_image.getAttribute("name");

            document.querySelector("body").style.backgroundColor = "#152028"
            wrapper.style.display = "block";
            wrapper.style.position = "relative";
            wrapper.style.bottom = "90px";
            wrapper.innerHTML = "";

            try{
                const response = await fetch("../../api/countries.php");
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

            const cancel_icon = wrapper.querySelector(".cancel-icon");
            const selected_country_name = document.querySelector("#wrapper").getAttribute("country_name");
            const selected_country_id = document.querySelector("#wrapper").getAttribute("country_id");
            cancel_icon.addEventListener("click", () => goBack(selected_country_name, selected_country_id));

            const save_icon = wrapper.querySelector(".save_icon");
            let isSaved = false;

            save_icon.addEventListener("click", () =>{
                if(!isSaved) {
                    
                    save_icon.innerHTML = "<i class='fa-solid fa-bookmark'></i>";
                    isSaved = true;
                } else {
                    save_icon.innerHTML = "<i class='fa-regular fa-bookmark'></i>";
                    isSaved = false;
                }

                
            });

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

