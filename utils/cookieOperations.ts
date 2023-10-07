import Cookies from "js-cookie";

export const cookieOperations = (operation: string, name: string, value: string | undefined = undefined) => {

    let cookie;

    switch(operation) {
        case "set":
            Cookies.set(name, value as string)
            break
        case "get": 
            cookie = Cookies.get(name)
            break
        case "remove": 
            Cookies.remove(name)
    }
    return cookie
}