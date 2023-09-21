import { navList } from "./navList";

//Get nav links by specific user.
export const getNavList = (role) => {
    
    const finalNavLinks = []

    for (let i = 0; i < navList.length; i++){
        if(role === navList[i].role){
            finalNavLinks.push(navList[i])
        }
    }
    return finalNavLinks
}