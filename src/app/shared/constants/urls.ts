const BASE_URL = 'http://localhost:3000'

export const FOOD_URL = BASE_URL + '/v1/api/food'
export const FOOD_URL_ID = FOOD_URL + '/findone/'
export const FOOD_SEARCH = FOOD_URL + '/allSearch/'
export const FOOD_TAG = FOOD_URL + '/tag'
export const FOOD_ALL_TAG_URL = FOOD_URL + '/AllFoodBytag/'

export const USER_URL = BASE_URL + '/v1/api/access'
export const USER_LOGIN = USER_URL + '/login'
export const USER_LOGOUT = USER_URL + '/logout'
export const USER_PROFILE = USER_URL + '/profile'