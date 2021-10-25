export const LOGIN = 'USER_LOGIN';
export const LOGOUT = 'USER_LOGOUT';
export const REGISTER = 'USER_REGISTER';
export const CHANGE = 'USER_CHANGE';

const initial = {
    users: [],
    current: ''
}

const userReducer = (state = initial, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                current: action.payload
            }
        }
        case LOGOUT: {
            return {
                ...state,
                current: ''
            }
        }
        case REGISTER: {
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        }
        case CHANGE: {
            let users = state.users;
            let candidate = users.findIndex(user => user.email === action.payload.email);
            users[candidate].password = action.payload.password;

            return {
                ...state, users
            }
        }

        default:
            return state;
    }
}

export default userReducer;