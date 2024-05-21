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
    
    render_liked("left");
    render_list("right");

}
