import { getTemplate, checkContext } from "../helpers/helper.js"
import { getData } from "../helpers/storage.js";

import * as create from "../models/movieModel.js"

import { getAllMovies } from "../models/movieModel.js";

export function getCreate(context) {

    let newContext = checkContext(context)
    getTemplate('movies/addMovie.hbs', newContext)  
}

export function postCreate(context) {
  
    const data = {
        ...context.params,
        peopleInterestedIn: 0,
        organizer: JSON.parse(getData('userInfo')).username
    };
    create.create(data)
    .then(()=>{
        context.redirect('#/home')
    })
    .catch(console.log)
}

export async function getMovies(context) {

    let newContext = checkContext(context);
    let movies = await getAllMovies();

    newContext.movies = movies;
    console.log(newContext);
    getTemplate('movies/allMovies.hbs', newContext);
}

export async function getMyMovies(context) {

    let newContext = checkContext(context);
    
    let movies = await getAllMovies();
    let myMovies = [];
    Object.keys(movies).forEach((e)=>{
        if(newContext.username === movies[e].organizer){
            myMovies[e] = movies[e];
        }
    });
    newContext.movies = myMovies;
    console.log(newContext);
    getTemplate('movies/myMovies.hbs', newContext);
}

export async function getDetails(context) {

    let newContext = checkContext(context);
    let movie = await create.getMovie(context.params.id);

    Object.keys(movie).forEach((e)=>{
        newContext[e] = movie[e];
    });
 
    newContext.isOrganizer = newContext.username === movie.organizer;
    getTemplate('movies/movieDetails.hbs', newContext)  


}

export async function getEdit(context) {
    let newContext = checkContext(context);
    let event = await create.getMovie(context.params.id);
    Object.keys(event).forEach((ev) => {
        newContext[ev] = event[ev];
    })
 
     getTemplate('movies/editMovie.hbs', context)
}

export function postEdit(context) {

    let newContext = checkContext(context);
    let data = {
        ...context.params
    }

    delete data.id
    create.edit(context.params.id, data)
    .then(()=> {
        newContext.redirect(`#/details/${context.params.id}`);
    })
    .catch(console.error)
}

export async function getDelete(context) {
    let newContext = checkContext(context);
    let event = await create.getMovie(context.params.id);
    Object.keys(event).forEach((ev) => {
        newContext[ev] = event[ev];
    })
     
     getTemplate('movies/deleteMovie.hbs', context)
}

export function postDelete(context) {

    let newContext = checkContext(context);
    let data = {
        ...context.params
    }

    delete data.id;
    create.delete(context.params.id, data)
    .then(()=> {
        newContext.redirect(`#/myMovies`);
    })
    .catch(console.error)
}

export async function buyTicket(context) {
    let newContext = checkContext(context);
    let movie = await create.getMovie(context.params.id);
    if(movie.tickets <= 0 || movie.tickets === undefined){
        alert('Tickets are over');
        throw new Error('Tickets are over');
    }
    movie.tickets--;
    Object.keys(movie).forEach((ev) => {
        newContext[ev] = movie[ev];
    })

    create.edit(context.params.id, movie)
    .then((ev) => {
        newContext.redirect(`#/cinema`)
    })
    console.log(context)
}