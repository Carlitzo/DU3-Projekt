function render_header(parent) {
    const header_container = document.createElement("div");
    header_container.id = "header";

    header_container.innerHTML = `
    <div id="name_slogan">
        <p id="name" class="heading">Luxe bites</p>
        <p id="slogan" class="heading">Discover food from around the globe</p>
        <h1 id="current_country"></h1> 
        <div class= 'user_icon'>
            <i class="fa-solid fa-user"></i>
        </div>
    </div>`;

    parent.appendChild(header_container);

}