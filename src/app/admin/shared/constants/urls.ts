const BASE_URL = 'http://localhost:3000'

export const FOOD_URL = BASE_URL + '/v1/api/food'
export const FOOD_URL_ID = FOOD_URL + '/findone/'
export const FOOD_SEARCH = FOOD_URL + '/allSearch/'
export const FOOD_TAG = FOOD_URL + '/tag'
export const FOOD_ALL_TAG_URL = FOOD_URL + '/AllFoodBytag/'
export const FOOD_UPDATE = FOOD_URL + '/update/'
export const FOOD_DELETE = FOOD_URL + '/delete/'

export const USER_URL = BASE_URL + '/v1/api/access'

export const USER_ALL_URL = BASE_URL + '/v1/api/user'
export const CURRENT_USER_URL = USER_ALL_URL + '/current/'
export const UPDATE_USER_URL = USER_ALL_URL + '/update'
export const DELETE_USER_URL = USER_ALL_URL + '/delete/'
export const CREATE_USER_URL = USER_ALL_URL + '/create'

export const AVATAR_URL = BASE_URL + '/v1/api/upload'
export const UPLOAD_AVATAR_URL = AVATAR_URL + '/user/thumb'

export const DISCOUNT_URL = BASE_URL + '/v1/api/discount'
export const DISCOUNT_CREATE_URL = DISCOUNT_URL + '/create'
export const DISCOUNT_DELETE_URL = DISCOUNT_URL + '/delete/'
export const DISCOUNT_UPDATE_URL = DISCOUNT_URL + '/update'