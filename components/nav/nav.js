async function render_nav(parent) {
    let resource = await fetch("../api/database.json");
    const database = await resource.json();
    const nav_wrapper = document.createElement("div");

    nav_wrapper.id = "nav_wrapper";
    parent.appendChild(nav_wrapper);

    for (let element of database.COUNTRIES) {
        let flag_wrapper = document.createElement("div");
        let img = document.createElement("img");
        let p = document.createElement("p");

        nav_wrapper.appendChild(flag_wrapper);
        flag_wrapper.appendChild(img);
        flag_wrapper.appendChild(p)

        flag_wrapper.className = "flag_wrapper";
        img.id = element.country_name;
        img.className = "flag_img";
        img.setAttribute("country_id", element.id)
        p.className = "country_p";

        img.setAttribute("src", element.flag);
        p.textContent = element.ISO_code;
    }


    const images = document.querySelectorAll(".flag_wrapper");
    
    images.forEach(image => {
        image.addEventListener("click", async () => {
            const countryName = image.querySelector("img").id;
            const countryId =  image.querySelector("img").getAttribute("country_id");

            document.querySelector("#wrapper").innerHTML = "";
            render_nav(wrapper);
            render_footer(wrapper);
            render_header(wrapper);

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

                parent.appendChild(div_1);

                const div_recipes = document.querySelector("#recipes_section");
                div_recipes.innerHTML = `<p id ='explore'>Explore our recipes</p>
                <div class ='recipe_content'></div>`

                countryRecipes.forEach(recipe => {
                    
                    document.querySelector(".recipe_content").innerHTML +=
                     `  <p class = 'recipe_name'>${recipe.name}</p>

                        <div class='info_side'>
                            <div class='around_img'>
                                <div class='background_img' style='background-image: url(${recipe.image})'></div>
                            </div>
                                
                            <div class='recipe_info'>
                                <p class='recipe_description'>${recipe.description}</p>
                                <p class='recipe_preparation_time'>prep-time: ${recipe.preparation_time}</p>
                            </div>
                        </div>`
                 
                });

                const recipes_images = document.querySelectorAll(".around_img") ;
                

                recipes_images.forEach(recipe_image =>{
                    recipe_image.addEventListener("click", async() =>{
                        document.querySelector("body").style.backgroundColor = "#152028"
                        wrapper.innerHTML = "";
                        
                        wrapper.innerHTML =`<div class='save_icon'><i class="fa-regular fa-bookmark"></i></div>`
                    })
                })

                

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    });
}