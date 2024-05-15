function render_login(parent) {
    document.querySelector("#wrapper").innerHTML = "";

    const container = document.createElement("div");
    container.id = "login_container"
    parent.appendChild(container);

    container.innerHTML = `
    <div id="outer_box">
        <div id="name">
            <p>Luxe Bites</p>
            <p>Discover food from around the globe</p>
        </div>
        <div id="inner_box">
            <div id="username_field">
                <p>Enter your username</p>
                <input type="text" placeholder="Enter your usrename" id="username">
            </div>
            <div id="password_field">
                <p>Enter your password</p>
                <input type="password" placeholder="Enter your password" id="password">
            </div>
            <div id="register">
                <p>Don't have an account yet? <span id="log_in_here"> Register here</span> </p>
                <p id="create_acc">Log in</p>
            </div>
        </div>
    </div> `

    document.querySelector("#log_in_here").addEventListener("click", () => {
        render_create_acc(document.querySelector("#wrapper"));
    })
}


const wrapper = document.querySelector("#wrapper");
render_login(wrapper);

function render_create_acc(parent) {
    document.querySelector("#wrapper").innerHTML = "";

    const new_container = document.createElement("div");
    new_container.id = "create_acc_container"
    parent.appendChild(new_container);

    new_container.innerHTML = `
    <div id="outer_box">
        <div id="name">
            <p>Luxe Bites</p>
            <p>Discover food from around the globe</p>
        </div>
        <div id="inner_box">
            <div id="username_field">
                <p>Choose a username</p>
                <input type="text" placeholder="Enter your desired usrename" id="username">
            </div>
            <div id="password_field">
                <p>Choose a password</p>
                <input type="password" placeholder="Enter your desired password" id="password">
            </div>
            <div id="login_create_acc">
                <p>Already have an account? <span id="log_in_here"> Log-in here </span> </p>
                <p id="create_acc">Create your account</p>
            </div>
        </div>
    </div> `

    document.querySelector("#log_in_here").addEventListener("click", () => {
        render_login(document.querySelector("#wrapper"));
    });

}