import { HttpHeaders } from "@angular/common/http";

const USER_KEY = "accessToken"

export const setUserToLocalStorageRegister = (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user.metadata.metadata.tokens.asscessToken));
}

export const setHeaders = (accessToken: any, parseClientId: any) => {
    const headers = new HttpHeaders()
    .set('authorization', `Bearer ${accessToken}`)
    .set('x-client-id', parseClientId);
    return headers
}

export const setUserToLocalStorage = (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user.metadata.tokens.asscessToken));
}

export const getUserFromLocalStorage = (): any => {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);   
        return user;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem(USER_KEY);
        return null; 
      }
    }
    return null;
}
