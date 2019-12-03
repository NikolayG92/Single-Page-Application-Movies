import { getTemplate, checkContext } from "../helpers/helper.js";

export async function getHome(context) {

    let newContext = checkContext(context);
    
    getTemplate('home.hbs', newContext);
}