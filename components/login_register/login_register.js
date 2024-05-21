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
    });

    document.querySelector("#create_acc").addEventListener("click", async () => {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        await login_user(username, password);
    });
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

    document.querySelector("#create_acc").addEventListener("click", async () => {
        const username = document.querySelector("#new_username").value;
        const password = document.querySelector("#new_password").value;
        await register_user(username, password);
    });

}

async function register_user(username, password) {
    try {
        const response = await fetch("../../api/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: username, password: password })
        });

        if (response.ok) {

            alert('Registration successful! Please log in.');
            render_login(document.querySelector("#wrapper"));
        } else {
            const errorData = await response.json();
            alert(`Registration failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
    }
}

async function loginUser(username, password) {
    try {
        const response = await fetch("../../api/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: username, password: password })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            window.location.href = '../homepage/homepage.html';
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
}


