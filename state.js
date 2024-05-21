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
        return JSON.parse(JSON.stringify(_state[entity]))
    },
    patch: (target_id) => {
        for (let element of _state.USERS) {
            if (localStorage.token === element.token) {
                for (let likedRecipe of element.liked_recipes) {
                    if (target_id === likedRecipe) {
                        likedRecipe.splice(Number(likedRecipe),1)
                    }
                }
            }
        }
    }


}
