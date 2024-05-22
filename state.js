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
    },
    get: async (entity) => {
        return JSON.parse(JSON.stringify(_state[entity]))
    },

    patch : async (target_id) => {
        try {
            const response = await fetch('./../../api/users.php');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            
            const users = await response.json();
    
            let currentUser = null;
            for (let user of users) {
                if (localStorage.id == String(user.id)) {
                    currentUser = user;
                }
            }
                if (currentUser) {
                const patchResponse = await fetch('./../../api/users.php', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: currentUser.id, recipe_id: target_id })
                });
    
                if (!patchResponse.ok) {
                    throw new Error('Failed to patch user');
                }

                const updatedUserPatch = await patchResponse.json();
    
            } else {
                console.error('User not found with the given id');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
}

