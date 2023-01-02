export const getSavedCookieValue = (name) => {
    const allCookies = document?.cookie?.split("; ").map((cookie: string) => {
      return {
        name: cookie.split("=")?.[0],
        value: cookie.split("=")?.[1],
      };
    });
  
    return allCookies.find((cookie) => cookie.name === name)?.value || "";
  };

export const isEmptyObject = (obj) => 
    obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype
  ;