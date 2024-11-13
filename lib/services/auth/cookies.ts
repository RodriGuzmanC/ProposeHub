// lib/cookies.ts
import Cookies from 'js-cookie';

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name);
};