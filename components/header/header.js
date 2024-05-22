function render_header(parent) {
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

    parent.appendChild(header_container);

    document.querySelector("#title").addEventListener("click", function () {
        wrapper.innerHTML = "";
        renderCarousel();
        render_header(wrapper);
        render_nav(wrapper);
        render_footer(wrapper);
        // carousel();
    })

    document.querySelector(".user_icon").addEventListener("click", function () {
        render_profile_page();
    })
}