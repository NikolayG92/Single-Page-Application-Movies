import { appKey } from "../helpers/storage.js";
import { post, get, put, del } from "../helpers/requester.js";

export function create(data) {
    return post(`appdata/${appKey}/movies`, data)
}

export async function getAllMovies() {
 
    return await get(`appdata/${appKey}/movies`)
}

export async function getMyMovies() {
     
    return await get(`appdata/${appKey}/myMovies`)
}

export async function getMovie(id) {

    return await get(`appdata/${appKey}/movies/${id}`)
}

export  function edit(id, data) {

    return  put(`appdata/${appKey}/movies/${id}`, data)
}   

export  function close(id) {
    return del(`appdata/${appKey}/movies/${id}`)
}