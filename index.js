const wrapper = document.querySelector("#wrapper");

if (localStorage.getItem("authToken") != null) {
    window.location.href = './components/homepage/homepage.html';
}
if (localStorage.getItem("authToken") === null) {
    render_login(wrapper);
} 