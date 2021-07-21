const BASE_URL = "http://localhost:9000/"; //django api address

export const LOGIN_URL = BASE_URL + "user/login";
export const REGISTER_URL = BASE_URL + "user/register";
export const PROFILE_URL = BASE_URL + "user/profile";
export const ME_URL = BASE_URL + "user/me";
export const REFERESH_URL = BASE_URL + "user/refresh";
export const LOGOUT_URL = BASE_URL + "user/logout";
export const FILE_UPLOAD_URL = BASE_URL + "message/file-upload"