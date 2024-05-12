async function render_countries (images){
    images.forEach(image => {
        image.addEventListener("click", async () => {
            const countryName = image.querySelector("img").id;
            const countryId =  image.querySelector("img").getAttribute("country_id");

            document.querySelector("#wrapper").innerHTML = "";
            
            render_nav(wrapper);
            render_footer(wrapper);
            render_header(wrapper);

            const header_1 = document.querySelector("#header");
            header_1.innerHTML+= `<p class='selected_country'>${countryName.toUpperCase()}</p>`
            

            try {
                const response = await fetch("../api/database.json");
                const data = await response.json();

                const countryData = data.COUNTRIES.find(country => country.country_name === countryName);
                const countryRecipes = data.RECIPES.filter(recipe => recipe.country_id === parseInt(countryId));
                
                let div_1 = document.createElement("div");
                div_1.classList.add("choosen_country");


                div_1.innerHTML= `<img class='country_img' src= ${countryData.country_image}>
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
                const recipes_images = document.querySelectorAll(".around_img") ;
                render_popup(recipes_images)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    });
}