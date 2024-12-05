import Cookies from "js-cookie";
export const getCookie = (cookieName, defaultValue = "") => {
  let value = defaultValue;
  let tempValue = Cookies.get(cookieName);
  if (tempValue) {
    value = tempValue;
  }
  return value;
};
