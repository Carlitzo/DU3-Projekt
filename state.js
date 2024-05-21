const _state = {
    USERS: [],
    COUNTRIES: [],
    RECIPES: []
};

const State = {
    start_app: async () => {
        _state.COUNTRIES = await fetch("./api/countries.php").then(response => response.json());
        _state.RECIPES = await fetch("./api/recipes.php").then(response => response.json());
        _state.USERS = await fetch("./api/users.php").then(response => response.json());

        console.log(State.USERS);
    },
    get: async (entity) => {
        return JSON.parse(JSON.stringify(_state[entity]));
    },

    patch: async (target_id) => {
        for (let user of _state.USERS) {
            if (localStorage.token === user.token) {
                const response = await fetch(`./api/users.php`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: user.id,
                        recipe_id: target_id
                    })
                });
                if (response.ok) {
                    const updatedUser = await response.json();
                    const index = _state.USERS.findIndex(u => u.id === updatedUser.id);
                    if (index !== -1) {
                        _state.USERS[index] = updatedUser;
                    }
                }
                break;
            }
        }
    }
};
