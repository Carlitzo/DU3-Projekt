const wrapper = document.querySelector("#wrapper");
if (localStorage.getItem("authToken") === null) {
    render_login(wrapper);
    window.location.href = "../../"
} 
render_header(wrapper);
render_nav(wrapper);
render_footer(wrapper);
carousel();
