export const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';
export const DEVELOPER_NAME = 'RovshanBadirkhanov';
export const ADD_DEVELOPER_NAME = `?developer=${DEVELOPER_NAME}`;
export const API_LOGIN = BASE_URL + 'login' + ADD_DEVELOPER_NAME;
export const API_LIST_OF_TASKS = BASE_URL + ADD_DEVELOPER_NAME;
export const API_ADD_TASK = BASE_URL + 'create' + ADD_DEVELOPER_NAME;
export const API_EDIT_TASK = id => BASE_URL + 'edit/' + id + ADD_DEVELOPER_NAME;

export const STATUS_OK = 'ok';

export const MUST_BE_FILLED = (field) => `Поле${field === undefined ? ' ' : ` ${field} `}является обязательным для заполнения`;
export const WRONG_USER_DATA = 'Неверный логин или пароль';
export const WRONG_EMAIL = 'Невалидный email';

