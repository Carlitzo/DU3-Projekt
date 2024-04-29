async function render_nav(parent_ID) {
    let resource = await fetch("../database/databaseexample.json");
    const database = await resource.json();

    const parent = document.querySelector(parent_ID);
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
        img.className = "flag_img";
        p.className = "country_p";
        
        img.setAttribute("src", element.flag);
        p.textContent = element.ISO_code;
    }

}