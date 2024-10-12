import Cookies from "js-cookie";

export class CookieUtils {
  static set(name: string, value: any, option = {}) {
    Cookies.set(name, value, { expires: 7 });
  }

  static get(name: string) {
    return Cookies.get(name);
  }

  static remove(name: string) {
    Cookies.remove(name);
  }
}
