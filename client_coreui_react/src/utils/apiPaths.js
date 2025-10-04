// utilis/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/signup',
    GET_ALL_USERS: '/user/users',

    CHECK_TOKEN: '/user/checktoken',
    UPDATE_USER: '/user/updateUser',
    DELETE_USER: (userId) => `/user/${userId}`,
    GET_USER_INFO: '/user/getUserInfo',
  },
  DASHBOARD: {
    DASHBOARD: '/dashboard',
  },
}
