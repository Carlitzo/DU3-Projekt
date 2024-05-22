async function render_popup(recipes_images) {

    recipes_images.forEach(recipe_image => {
        recipe_image.addEventListener("click", async () => {
            const recipe_name_popup = recipe_image.getAttribute("name");

            setupPopup(wrapper);

            try {
                const [data_users, data] = await Promise.all([
                    fetch("../../api/users.php").then(res => res.json()),
                    fetch("../../api/recipes.php").then(res => res.json())
                ]);

                const recipe_content_popup = data.find(recipe => recipe.name === recipe_name_popup);
                const current_user_id = Number(localStorage.getItem("id"));
                const current_user = data_users.find(user => user.id == current_user_id);
                const bookmark_icon = current_user && current_user.liked_recipes.includes(recipe_content_popup.recipe_id) ? "solid" : "regular";

                wrapper.innerHTML = getPopupHTML(recipe_content_popup, bookmark_icon);

                setupEventListeners(wrapper, recipe_content_popup, current_user_id);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    });
}

function setupPopup(wrapper) {
    document.querySelector("body").style.backgroundColor = "#152028";
    wrapper.style.display = "block";
    wrapper.style.position = "relative";
    wrapper.style.bottom = "90px";
    wrapper.innerHTML = "";
}

function getPopupHTML(recipe, bookmark_icon) {
    let popup_conatiner = `
        <div class='icons_options'>
            <div class='save_icon'><i class="fa-${bookmark_icon} fa-bookmark"></i></div>
            <div class='cancel-icon'><i class="fa-solid fa-x"></i></div>
        </div>
        <p class='recipe_name_popup'>${recipe.name}</p>
        <div class='info_side_popup'>
            <div class='around_img_popup' recipe_id='${recipe.recipe_id}'>
                <div class='background_img_popup' style='background-image: url(${recipe.image})'></div>
            </div>
            <div class='recipe_info_popup'>
                <p class='recipe_description_popup'>${recipe.description}</p>
                <p class='recipe_preparation_time_popup'>prep-time: ${recipe.preparation_time}</p>
            </div>
        </div>
        <div class='ingredients_section'>
            <div class='ingredients_title'>
                <p>INGREDIENTS</p>
            </div>
            <ul class='ingredients_list'>`;

    recipe.ingredients.forEach(ingredient => {
        popup_conatiner += `<div><p>•</p><p>${ingredient}</p></div>`;
    });

    popup_conatiner += `
            </ul>
        </div>
        <div class='instructions_section'>
            <p>INSTRUCTIONS</p>
            <ul class='instructions_list'>`;

    recipe.steps.forEach(step => {
        popup_conatiner += `<div><p>•</p><p>${step}</p></div>`;
    });

    popup_conatiner += `
            </ul>
        </div>`;

    return popup_conatiner;
}


function setupEventListeners(wrapper, recipe, current_user_id) {
    wrapper.querySelector(".cancel-icon").addEventListener("click", () => {
        const selected_country_name = wrapper.getAttribute("country_name");
        const selected_country_id = wrapper.getAttribute("country_id");
        goBack(selected_country_name, selected_country_id);
    });

    wrapper.querySelector(".save_icon").addEventListener("click", async () => {
        await State.patch(recipe.recipe_id);
        const updated_data_users = await fetch("../../api/users.php").then(res => res.json());
        const updated_user = updated_data_users.find(user => user.id === current_user_id);
        const bookmark_icon = updated_user.liked_recipes.includes(recipe.recipe_id) ? "solid" : "regular";
        wrapper.querySelector(".save_icon").innerHTML = `<i class="fa-${bookmark_icon} fa-bookmark"></i>`;
    });
}
