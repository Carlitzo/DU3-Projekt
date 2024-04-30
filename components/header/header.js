function render_header(parent) {
    const header_container = document.createElement("div");
    header_container.id = "header";

    header_container.innerHTML = `
    <div id="name_slogan">
    <p id="name" class="heading">Luxe bites</p>
    <p id="slogan" class="heading">Discover food from around the globe</p>
    <h1 id="current_country></h1> 
<<<<<<< HEAD
    <i class="fa-solid fa-user"></i>`;
=======
    <i class="fa-solid fa-user"></i>
    </div>`
>>>>>>> c19b39ffc192496aa59b067b78dfb9e903872b41

    parent.appendChild(header_container);
}