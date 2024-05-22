async function render_profile_page() {
    
    wrapper.innerHTML = "";

    const header_container = document.createElement("div");
    header_container.id = "header";

    header_container.innerHTML = `
    <div id="name_slogan">
        <p id="title" class="heading">Luxe Bites</p>
        <p id="slogan" class="heading">Discover food from around the globe</p>
        <h1 id="current_country"></h1> 
        <div class= 'user_icon'>
            <i class="fa-solid fa-user"></i>
        </div>
    </div>`;

    wrapper.appendChild(header_container);

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

    render_liked("left");
    render_list("right");
}
