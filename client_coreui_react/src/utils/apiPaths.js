// utilis/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/signup',
    GET_ALL_USERS: '/api/user/users',
    GET_CURRENT_USER: '/api/auth/me',

    CHECK_TOKEN: '/api/user/checktoken',
    UPDATE_USER: '/api/user/updateUser',
    DELETE_USER: (userId) => `/api/user/${userId}`,
    GET_USER_INFO: '/api/user/getUserInfo',
  },
  DASHBOARD: {
    DASHBOARD: '/api/dashboard',
  },
}
